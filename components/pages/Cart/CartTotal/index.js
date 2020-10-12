import React, { useContext } from "react";
import { View } from "react-native";
import styles from "./styles";
import { stateContext } from "../../../../contexts";
import OurText from "../../../OurText";

/** Компонент, который показывает итоговую цену */
const CartTotal = (props) => {
    const state = useContext(stateContext);

    return (
        <View style={styles.container}>
            <OurText style={styles.text} params={{total:state.cartTotalPrice, currency: "$"}}>cartTotal</OurText>
        </View>
    );
};

export default CartTotal; 