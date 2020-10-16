import React, { useContext, useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";
import { ListAnimation } from "../../../../Animations";


const totalHeight = Dimensions.get("window").height - 180;
const itemWidth = Dimensions.get("window").width;
const itemHeight = 60;


/** Компонент товара в корзине */
const CartItem = (props) => {
    const { x, y, index, productId, name, price, count } = props;

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight, itemWidth, index);

    return (
        <Animated.View style={[styles.container, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
            <OurText style={styles.item_name}>{name}</OurText>
            <OurText style={styles.item_count} params={{count: count}}>cartPcs</OurText>
            <View style={styles.right}>
                <OurText style={styles.item_price}>{price * count}$</OurText>
                <ItemCount productId={productId}/>
            </View>
        </Animated.View>
    );
};

export default React.memo(CartItem); 