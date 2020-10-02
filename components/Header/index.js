import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { Badge } from 'native-base';
import { stateContext, dispatchContext } from "../../contexts";
import OurText from "../OurText";
import styles from "./styles.js";
import { faChevronLeft, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';
import OurIconButton from "../OurIconButton";

/** Шапочка приложения с навигацией*/
const Header = (props) =>
{
    const {
        title,
        titleFunc,
        showCart,
        navigation,
    } = props;
    const showBack = (typeof(props.showBack) === "boolean")
        ? props.showBack : !navigation.isFirstRouteInParent();
    
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
            <View style={styles.container}>
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
                                    state?.cartItems?.length ?
                                        <Badge success style={styles.badge}>
                                            <OurText style={styles.badgeText}>
                                                {
                                                    state?.cartItems?.length ?
                                                        (() => {
                                                            if ( state.cartItems.length < 10 )
                                                                return state.cartItems.length;
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