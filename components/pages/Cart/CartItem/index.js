import React, { useContext, useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";
import OurImage from "../../../OurImage";
import { ListAnimation } from "../../../../Animations";
import { STORE_ADDRESS } from "../../../../config";


const totalHeight = Dimensions.get("window").height - 180;
const itemWidth = Dimensions.get("window").width;
const itemHeight = 144;


/** Компонент товара в корзине */
const CartItem = (props) => {
    const { x, y, index, productId, name, price, count, imageLink } = props;

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
            <View style={styles.topContainer}>
                <OurText style={styles.itemName}>{name}</OurText>
                <OurImage style={styles.productImage} url={`${STORE_ADDRESS}wp-content/uploads/${imageLink}`} disabled={true}/>
            </View>
            <View style={styles.bottomContainer}>
                <OurText style={styles.itemCount} params={{count: count}}>cartPcs</OurText>
                <View style={styles.itemCountController}>
                    <OurText style={styles.itemPrice}>{price * count}$</OurText>
                    <ItemCount productId={productId}/>
                </View>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.itemBorder}/>
            </View>
        </Animated.View>
    );
};

export default React.memo(CartItem); 