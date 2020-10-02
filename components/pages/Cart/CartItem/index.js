import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";

const findProductById = (productId, state) => {
    for (let i=0; i<=state.cartItems.length; i++) {
        if ( state.cartItems[i].productId === productId )
            return state.cartItems[i];
    }
    return null;
};

/** Компонент товара в корзине */
const CartItem = (props) =>
{
    const { productId } = props;
    const state = useContext(stateContext);
    const [product, setProduct] = useState();

    useEffect( () => {
        setProduct(findProductById(productId, state));
    });

    return (
        <>
        { product ?
            <View style={styles.container}>
                <OurText style={styles.item_name}>{product.name}</OurText>
                <OurText style={styles.item_count} params={{count: product.count}}>cartPcs</OurText>
                <View style={styles.right}>
                    <OurText style={styles.item_price}>{product.price * product.count}$</OurText>
                    <ItemCount productId={productId}/>
                </View>
            </View>
            : <></>
        }
        </>
    );
};

export default CartItem; 