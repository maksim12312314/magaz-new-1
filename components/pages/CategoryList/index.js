import React, { useContext, useEffect, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { LinearGradient } from 'expo-linear-gradient';
import { stateContext, dispatchContext } from "~/contexts";
import { SetCategoryList, ShowModal, AddToast } from "~/actions";
import { getCategoryListQuery } from "~/queries";
import { addCategoryToDB, getCategoryListFromDB } from "~/db_handler";
import useFetch from "~/network_handler";
import { STORE_ADDRESS } from "~/config";
import { expo } from "~/app.json";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import CategoryItem from "./CategoryItem";
import styles from "./styles";

import { HeaderTitle, HeaderCartButton } from "~/components/Header";
import { QUERY_CATEGORY_LIST } from '~/queries';

/**Список категорий товаров*/
const CategoryList = (props) => {
    const { navigation } = props;
    const [gradStart, gradEnd] = ["#65B7B9", "#078998"];
    const abortController = new AbortController();

    const showAppInfo = (e) => {
        const data = {
            title: { text: expo.name, params: {} },
            text: { text: "appInfo", params: { version: expo.version } },
            animationIn: "bounceInDown",
            animationOut: "bounceOutUp",
            buttons: [{
                text: "ok",
            }]
        };
        dispatch(ShowModal(data));
    };

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderTitle navigation={navigation} title={"categoryListTitle"} onPress={showAppInfo}/>,
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

    /*useEffect( (setLoading, setError, abortController) => {
        if ( !state?.categories?.length ) {
            getCategoryListFromDB((tr, result) => {
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
                dispatch(SetCategoryList(data));
                //setLoading(false);
            });
        }
    });*/
    const onSuccess = ({data}) => {
        console.log("COMPLETE", data);
        /*data?.productCategories?.nodes?.map( (v, i) => {
            addCategoryToDB(v.name, v.productCategoryId, v.image?.mediaDetails?.file);
        });
        dispatch(SetCategoryList(data?.productCategories?.nodes));*/
    };

    const { loading, error, data, refetch } = useQuery(QUERY_CATEGORY_LIST, {
        variables: { hideEmpty: true },
        context: {
            fetchOptions: {
                signal: abortController.signal,
            }
        },
        onCompleted: onSuccess,
        onError: (err) => {console.log("WTF", error)}
    });

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                ( loading || error || abortController.signal.aborted ) ?
                    <OurActivityIndicator error={error} abortController={abortController} doRefresh={refetch} buttonTextColor={gradStart}/>
                    :
                    <FlatList
                        contentContainerStyle={{paddingTop: 12, alignItems: "center", justifyContent: "center"}}
                        numColumns={2}
                        data={data}
                        refreshing={loading}
                        onRefresh={() => {refetch()}}
                        renderItem={GetCategoryItem}
                        keyExtractor={(item, key) => String(key)}/>
            }
        </>
    );
};

export default CategoryList;