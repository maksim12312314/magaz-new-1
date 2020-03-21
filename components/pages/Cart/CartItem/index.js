import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";


/** Компонент товара в корзине */
const CartItem = (props) =>
{
    const {id, name, price, count} = props.data;
    return (
        <View style={styles.container}>
            <OurText style={styles.item_name}>{name}</OurText>
            <OurText style={styles.item_count}>{count} шт</OurText>
            <View style={styles.right}>
                <OurText style={styles.item_price}>{price*count}$</OurText>
                <ItemCount id={id} count={count}/>
            </View>
        </View>
    );
}

export default CartItem; 