import React, { useState, useLayoutEffect } from "react";
import { View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import { ShowModal } from "~/redux/ModalReducer/actions";

import { HeaderBackButton, HeaderTitle, HeaderOrdersButton } from "~/components/Header/index";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import styles from "./styles";

const LocallyAnimatedFlatList = ({data}) => {
    const renderItemsBlock = ({item, index}) => {
        return (
            <CartItem productId={item.product.databaseId} name={item.product.name} price={item.total} productQuantity={item.quantity} imageLink={item.product.image.mediaDetails.file}/>
        );
    };

    return (
        <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.cartList}
            data={data}
            renderItem={renderItemsBlock}
            keyExtractor={(item) => String(item.key)}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

/** Компонент корзины */
const Cart = (props) => {
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const { navigation } = props;
    const [gradStart, gradEnd] = ["#E81C1C", "#E4724F"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props) => <HeaderBackButton navigation={navigation}/>,
            headerCenter: (props) => <HeaderTitle navigation={navigation} title={"cartTitle"}/>,
            headerRight: (props) => <HeaderOrdersButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);
    /*
    const onError = (err) => {
        const toast = {
            icon: faShoppingBasket,
            text: t("activityError"),
            duration: 3000,
            color: "#499eda",
        };
        dispatch(AddToast(toast, "CART_FETCH_ERROR"));
        console.log("Something went wrong", err)
    };
    const onCompleted = (data) => {
        dispatch(SetCartProducts(data?.cart?.contents?.nodes || [], data?.cart?.total || 0));
    };
    const { loading, error, data, refetch } = useQuery(QUERY_GET_CART, {
        onError,
        onCompleted,
    });*/

    const toDeliveryDetails = (e) => {
        if ( state.cartItems?.size ) {
            if ( SyncStorage.get("bearer-token") ) {
                const loginModalData = {
                    title: { text: "cartLoginTitle", params: {} },
                    text: { text: "cartLoginMessage", params: {} },
                    animationIn: "fadeInUp",
                    animationOut: "fadeOutDown",
                    buttons: [
                        {
                            text: "cancel",
                            textStyle: {
                                color: "#383838",
                            },
                        },
                        {
                            text: "welcomePageRegister",
                            onPress: (e) => {
                                navigation.navigate("RegisterPage");
                            },
                        },
                        {
                            text: "welcomePageLogin",
                            onPress: (e) => {
                                navigation.navigate("LoginPage");
                            },
                        },
                    ],
                };
                dispatch(ShowModal(loginModalData));
            } else {
                navigation.navigate("DeliveryDetails");
            }
        }
    };

    return (
        <>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]}/>

                <View style={styles.items}>
                    {
                        loading ?
                        <OurActivityIndicator />
                        :
                        state.cartItems?.size === 0 && !loading ?
                            <OurText style={styles.emptyText}
                                translate={true}>cartEmpty</OurText>
                        : <></>
                        
                    }
                    <MemoedLocallyAnimatedFlatList data={Array.from(state.cartItems.values())}/>
                    <CartTotal total={state.cartTotalPrice} />
                    <View style={styles.bottomContainer}>
                    <OurTextButton
                        translate={true}
                        disabled={!state.cartItems.size}
                        onPress={toDeliveryDetails}
                        style={styles.checkoutButton}
                        textStyle={{color: gradEnd}}
                        >cartCheckout</OurTextButton>
                    </View>
                </View>
        </>
    );
};

export default Cart; 