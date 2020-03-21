import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import { stateContext, dispatchContext } from "../../../../contexts";
import OurText from "../../../OurText";

/** Компонент, который показывает итоговую цену */
const CartTotal = (props) =>
{
    const context = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    
    useEffect( () =>
    {
        dispatch({type: "ComputeTotalPrice"});
    }, []);

    return (
        <View style={styles.container}>
            <OurText style={styles.text}>Итого: {context.cartTotalPrice}$</OurText>
        </View>
    );
}

export default CartTotal; 