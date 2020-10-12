import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { stateContext, dispatchContext } from "../../../contexts";
import OurActivityIndicator from "../../OurActivityIndicator";
import CategoryItem from "./CategoryItem";
import styles from "./styles";
import { STORE_ADDRESS } from "../../../config";

import {
    SetCategoriesList,
} from "../../../actions";
import { getCategoryListQuery } from "../../../queries";
import { addCategory, getDBCategoryList } from "../../../db_handler";
import { HeaderTitle, HeaderCartButton } from "../../Header";
import useFetch from "../../../network_handler";

/**Список категорий товаров*/
// TODO abort fetch in case of change of page
const CategoryList = (props) =>
{
    const { navigation } = props;
    const [gradStart, gradEnd] = ["#65B7B9", "#078998"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderTitle navigation={navigation} title={"categoryListTitle"}/>,
            headerCenter: (props)=>{},
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const GetCategoryItem = ({item}) => {
        return (
            <CategoryItem navigation={navigation} name={item.name} id={item.productCategoryId} imageUrl={item?.image?.mediaDetails?.file} cached={item.cached}/>
        )
    };

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const onMount = (setLoading, setError, abortController) => {
        if ( !state?.categories?.length ) {
            getDBCategoryList((tr, result) => {
                let data = [];
                for (let i = 0; i <= result.rows.length; i++) {
                    const row = result.rows.item(i);

                    if (row)
                        data.push({
                            name: row.name,
                            productCategoryId: row.productCategoryId,
                            image: {
                                mediaDetails: {
                                    file: row.imageLink,
                                }
                            },
                            cached: true,
                        });
                }
                dispatch(SetCategoriesList(data));
                setLoading(false);
            });
        }
    };
    const onSuccess = ({data}) => {
        data?.productCategories?.nodes?.map( (v, i) => {
            addCategory(v.name, v.productCategoryId, v.image?.mediaDetails?.file);
        });
        dispatch(SetCategoriesList(data?.productCategories?.nodes));
    };

	const [
	    data,
        loading,
        error,
        fetchData,
        abortController
    ] = useFetch(`${STORE_ADDRESS}graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: getCategoryListQuery(),
    }, undefined, onMount, onSuccess);

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                ( loading || error) ?
                    <OurActivityIndicator error />
                    :
                    <FlatList
                        contentContainerStyle={{paddingTop: 12, alignItems: "center", justifyContent: "center"}}
                        numColumns={2}
                        data={state.categories}
                        refreshing={loading}
                        onRefresh={() => {fetchData()}}
                        renderItem={GetCategoryItem}
                        keyExtractor={(item, key) => String(key)}/>
            }
        </>
    );
};

export default CategoryList;