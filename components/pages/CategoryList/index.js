import React, { useContext, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { useQuery } from "@apollo/client";
import { LinearGradient } from 'expo-linear-gradient';
import { stateContext, dispatchContext } from "~/contexts";
import { ShowModal } from "~/actions";
import { QUERY_CATEGORY_LIST } from '~/queries';
import { expo } from "~/app.json";
import { HeaderTitle, HeaderCartButton } from "~/components/Header";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import CategoryItem from "./CategoryItem";
import styles from "./styles";


/**Список категорий товаров*/
const CategoryList = (props) => {
    const { navigation } = props;
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
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


    const { loading, error, data, refetch } = useQuery(QUERY_CATEGORY_LIST, {
        variables: { hideEmpty: true },
        context: {
            fetchOptions: {
                signal: abortController.signal,
            }
        },
        onError: (err) => {console.log("Error while fetching categories", error)}
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
                        contentContainerStyle={styles.flatListContentContainer}
                        numColumns={2}
                        data={data?.productCategories?.nodes}
                        refreshing={loading}
                        onRefresh={() => {refetch()}}
                        renderItem={({item}) => <CategoryItem navigation={navigation}
                                                        name={item.name}
                                                        id={item.productCategoryId}
                                                        imageUrl={item?.image?.mediaDetails?.file}
                                                        cached={item.cached}/>}
                        keyExtractor={(item, key) => String(key)}/>
            }
        </>
    );
};

export default CategoryList;