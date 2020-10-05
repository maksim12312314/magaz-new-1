import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { stateContext, dispatchContext } from "../../../../contexts";
import OurText from "../../../OurText";

import {
    ComputeTotalPrice,
} from "../../../../actions";

/** Компонент, который показывает итоговую цену */
const CartTotal = (props) =>
{
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    
    useEffect( () =>
    {
        dispatch(ComputeTotalPrice());
    }, [state.cartItems.size]);

    return (
        <View style={styles.container}>
            <OurText style={styles.text} params={{total:state.cartTotalPrice, currency: "$"}}>cartTotal</OurText>
        </View>
    );
}

export default CartTotal; 