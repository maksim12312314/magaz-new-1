import React, { useState, useEffect, useRef } from "react";
import { Animated, Dimensions, View, LayoutAnimation } from "react-native";

import { STORE_ADDRESS } from "~/utils/config";

import OurText from "~/components/OurText";
import OurImage from "~/components/OurImage";
import OurImageSlider from "~/components/OurImageSlider";
import OurCounter from "~/components/OurCounter";
import styles from "./styles";

const ANIMATION_DURATION = 200;
const PRODUCT_MIN_HEIGHT = 0.0001;

const linear = LayoutAnimation.create(
    ANIMATION_DURATION,
    LayoutAnimation.Types.linear,
    LayoutAnimation.Properties.scaleY,
);

const MIN_QUANTITY = 1;
const MAX_QUANTITY = Infinity;

/** Компонент товара в корзине */
const CartItem = (props) => {
    const { productId, name, price, productQuantity, imageLink } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [quantity, setQuantity] = useState(productQuantity || MIN_QUANTITY)
    const opacity = useRef(new Animated.Value(1)).current;

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const onQuantityChange = (quantity) => {
        if ( typeof quantity === "string")
            quantity = Number(quantity.replace(/[^0-9]/g, ''));

        setQuantity(Math.clamp(quantity, MIN_QUANTITY, MAX_QUANTITY));
    };

    const onRemove = (callback) => {
        LayoutAnimation.configureNext(linear);
        Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start(callback);
        //setHeight(PRODUCT_MIN_HEIGHT);
    };
    const total = price.match(/(\d{0,99})\.(\d{0,99})(\D)/);
    const newPrice = total[1] + total[3];

    return (
        <Animated.View style={[styles.mainContainer, { opacity }]}>
            <View style={styles.topContainer}>
                <OurText style={styles.itemName}>{name}</OurText>
                <OurImage style={styles.productImage} url={`${STORE_ADDRESS}wp-content/uploads/${imageLink}`} onPress={toggleModal}/>
                <OurImageSlider data={[`${STORE_ADDRESS}wp-content/uploads/${imageLink}`]} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            </View>
            <View style={styles.bottomContainer}>
                <View style={styles.counterContainer}>
                    <OurCounter onChange={onQuantityChange} value={quantity} color="#499eda"/>
                    {/*<OurText style={[styles.itemPrice, {marginLeft: 8}]} translate={true}>productQuantity</OurText>*/}
                </View>
                <OurText style={styles.itemPrice} translate={true} params={{total: price}}>cartTotal</OurText>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.itemBorder}/>
            </View>
        </Animated.View>
    );
};

export default React.memo(CartItem); 