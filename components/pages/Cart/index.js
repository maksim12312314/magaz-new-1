import React, { useContext } from "react";
import { stateContext } from "../../../contexts";

import { View, FlatList, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import Header from "../../Header/index";
import OurText from "../../OurText";

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
    const {navigation} = props;

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
                    <TouchableOpacity
                        activeOpacity={ !state.cartItems.length ? 1.0 : 0.2 }
                        style={!state.cartItems.length ? styles.button_disabled : styles.button_enabled}
                        onPress={()=>{
                            if ( state.cartItems.length )
                                navigation.navigate('DeliveryDetails');
                        }}>

                        <OurText style={styles.text_button} translate={true}>cartCheckout</OurText>
                    </TouchableOpacity>
                </View>
        </>
    );
};

export default Cart; 