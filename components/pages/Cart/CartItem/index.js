import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";

const findProductById = (id, state) => {
    for (let i=0; i<=state.cartItems.length; i++) {
        if ( state.cartItems[i].id === id )
            return state.cartItems[i];
    }
    return null;
};

/** Компонент товара в корзине */
const CartItem = (props) =>
{
    const { id } = props;
    const state = useContext(stateContext);
    const [product, setProduct] = useState();

    useEffect( () => {
        setProduct(findProductById(id, state));
    });

    return (
        <>
        { product ?
            <View style={styles.container}>
                <OurText style={styles.item_name}>{product.name}</OurText>
                <OurText style={styles.item_count} params={{count: product.count}}>cartPcs</OurText>
                <View style={styles.right}>
                    <OurText style={styles.item_price}>{product.price * product.count}$</OurText>
                    <ItemCount id={id} count={product.count}/>
                </View>
            </View>
            : <></>
        }
        </>
    );
};

export default CartItem; 