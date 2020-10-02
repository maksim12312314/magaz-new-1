import React, { useContext, useState, useEffect } from "react";
import { View } from "react-native";
import { stateContext } from "../../../../contexts";
import ItemCount from "./ItemCount";
import styles from "./styles";
import OurText from "../../../OurText";

const findProductById = (productId, state) => {
    if ( state.cartItems.has(productId) )
        return state.cartItems.get(productId);
    else
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

const areEqual = (prevProps, newProps) => {
    return ( prevProps.productId == newProps.productId ) && ( prevProps.count == newProps.count );
}

export default React.memo(CartItem, areEqual);