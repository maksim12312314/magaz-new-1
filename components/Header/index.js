import React, { useContext, useEffect } from "react";
import { useRoute, useNavigationState } from "@react-navigation/native";
import { View, TouchableOpacity } from "react-native";
import { Badge } from 'native-base';
import { stateContext, dispatchContext } from "../../contexts";
import OurText from "../OurText";
import styles from "./styles.js";
import chevronLeft from "../../assets/icons/chevron-left-solid.png";
import shoppingBasket from "../../assets/icons/shopping-basket-solid.png";
import OurIconButton from "../OurIconButton";


const isFirstRouteInParent = () => {
    const route = useRoute();
    const isFirstRouteInParent = useNavigationState(
        state => state.routes[0].key === route.key
    );

    return isFirstRouteInParent;
};

export const HeaderBackButton = (props) => {
    const { navigation } = props;

    const goBack = (e) => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.backContainer}>
                <OurIconButton icon={chevronLeft} height={49} onPress={goBack}/>
            </View>
        </View>
    );
};

export const HeaderTitle = (props) => {
    const { title, onPress } = props;

    const doPress = (e)=>{
        if ( onPress )
            onPress(e);
    };

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity activeOpacity={ onPress ? 0.2 : 1 } onPress={doPress}>
                    <OurText style={styles.title} translate={true}>{title}</OurText>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export const HeaderCartButton = (props) => {
    const { navigation } =  props;
    const state = useContext(stateContext);

    const goToCart = (e) => {
        navigation.navigate("Cart");
    };

    return (
        <View style={styles.container}>
            <View style={styles.cartContainer}>
                <View style={styles.iconCart}>
                    <OurIconButton icon={shoppingBasket} width={50} onPress={goToCart}>
                        {
                            state?.cartItems?.size ?
                                <Badge success style={styles.badge}>
                                    <OurText style={styles.badgeText}>
                                        {
                                            state?.cartItems?.size ?
                                                (() => {
                                                    if ( state.cartItems.size < 10 )
                                                        return state.cartItems.size;
                                                    else
                                                        return "9+";
                                                })()
                                                : <></>
                                        }
                                    </OurText>
                                </Badge>
                                : <></>
                        }
                    </OurIconButton>
                    <OurText style={styles.priceText}>
                        {state.cartTotalPrice}$
                    </OurText>
                </View>
            </View>
        </View>
    );
};


/** Шапочка приложения с навигацией*/
const Header = (props) =>
{
    const {
        title,
        titleFunc,
        showCart,
        navigation,
        backgroundColor,
    } = props;

    const showBack = (typeof(props.showBack) === "boolean")
        ? props.showBack : !isFirstRouteInParent();
    
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const goBack = (e) => {
        navigation.goBack();
    };

    const goToCart = (e) => {
        navigation.navigate("Cart");
    };

    return (
        <>
            <View style={[styles.container, {backgroundColor}]}>
                <View style={styles.backContainer}>
                    {
                        showBack ?
                            <OurIconButton icon={faChevronLeft} size={49} onPress={goBack}/>
                            : <></>
                    }
                </View>

                <View style={styles.titleContainer}>
                    {title ?
                        <TouchableOpacity activeOpacity={ titleFunc ? 0.2 : 1 } onPress={()=>{
                            if (titleFunc)
                                titleFunc();
                        }}
                        >
                            <OurText style={styles.title} translate={true}>{title}</OurText>
                        </TouchableOpacity> : <></>
                    }
                </View>

                <View style={styles.cartContainer}>
                    {showCart ?
                        <View style={styles.iconCart}>
                            <OurIconButton icon={faShoppingBasket} size={50} onPress={goToCart}>
                                {
                                    state?.cartItems?.size ?
                                        <Badge success style={styles.badge}>
                                            <OurText style={styles.badgeText}>
                                                {
                                                    state?.cartItems?.size ?
                                                        (() => {
                                                            if ( state.cartItems.size < 10 )
                                                                return state.cartItems.size;
                                                            else
                                                                return "9+";
                                                        })()
                                                        : <></>
                                                }
                                            </OurText>
                                        </Badge>
                                        : <></>
                                }
                            </OurIconButton>
                            <OurText style={styles.priceText}>
                                {state.cartTotalPrice}$
                            </OurText>
                        </View> : <></>
                    }
                </View>
            </View>
        </>
    );
};

export default React.memo(Header);