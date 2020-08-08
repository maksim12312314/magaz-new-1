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
    const context = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    
    useEffect( () =>
    {
        dispatch(ComputeTotalPrice());
    }, []);

    return (
        <View style={styles.container}>
            <OurText style={styles.text} params={{total:context.cartTotalPrice, currency: "$"}}>cartTotal</OurText>
        </View>
    );
}

export default CartTotal; 