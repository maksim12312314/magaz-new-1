import React, { useContext, useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";
import { ListAnimation } from "../../../../Animations";


const findProductById = (productId, cartItems) => {
    if ( cartItems.has(productId) )
        return cartItems.get(productId);
    else
        return null;
};

const totalHeight = Dimensions.get("window").height - 180;
const itemWidth = Dimensions.get("window").width;
const itemHeight = 60;

/** Компонент товара в корзине */
const CartItem = (props) => {
    const { x, y, index, productId } = props;
    const state = useContext(stateContext);
    const [product, setProduct] = useState(findProductById(productId, state.cartItems));

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight, itemWidth, index);

    useEffect( () => {
        setProduct(findProductById(productId, state.cartItems));
    }, [product.count]);

    return (
        <>
        { product ?
            <Animated.View style={[styles.container, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
                <OurText style={styles.item_name}>{product.name}</OurText>
                <OurText style={styles.item_count} params={{count: product.count}}>cartPcs</OurText>
                <View style={styles.right}>
                    <OurText style={styles.item_price}>{product.price * product.count}$</OurText>
                    <ItemCount productId={productId}/>
                </View>
            </Animated.View>
            : <></>
        }
        </>
    );
};

export default React.memo(CartItem); 