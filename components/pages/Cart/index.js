import React, { useContext } from "react";
import { stateContext } from "../../../contexts";

import {View, FlatList} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import Header from "../../Header/index";
import OurTextButton from "../../OurTextButton";

/** Компонент блока товаров  */
const ItemsBlock = ({item})=> {    
    return (
        <CartItem id={item.id}/>
    );
};

/** Компонент корзины */
const Cart = (props) =>
{
    const state = useContext(stateContext);
    const { navigation } = props;

    const toCheckout = (e)=> {
        if ( state.cartItems.length )
            navigation.navigate('DeliveryDetails');
    };

    return (
        <>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 1.0]}
                colors={["#E81C1C", "#E4724F"]}/>

                <Header {...props} title={"cartTitle"} titleFunc={() => { navigation.navigate('DeliveryDetails') }}/>
                <View style={styles.items}>
                    <CartIcon />
                    <FlatList
                        contentContainerStyle={styles.cartList}
                        data={state.cartItems}
                        renderItem={ItemsBlock}
                        keyExtractor={(item, index) => String(index)}/>
                    <CartTotal />
                    <OurTextButton
                        translate={true}
                        disabled={!state.cartItems.length}
                        onPress={toCheckout}
                        style={styles.checkoutButton}
                        >cartCheckout</OurTextButton>
                </View>
        </>
    );
};

export default Cart; 