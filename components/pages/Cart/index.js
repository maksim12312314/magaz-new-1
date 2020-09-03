import React, { useContext } from "react";
import { stateContext, dispatchContext } from "../../../contexts";

import { ScrollView, TouchableOpacity, View, Text, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CartIcon from "./CartIcon";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import Header from "../../Header/index";
import OurText from "../../OurText";

/** Компонент блока товаров  */
const ItemsBlock = (props)=>{

    const state = useContext(stateContext);
    
    return (
        <View style={styles.itemsBlock}> 
            { !state.cartItems.length
                ? <OurText style={{color: "#FFF"}} translate={true}>cartEmpty</OurText>
                : state.cartItems.map( (v, i) =>
                {
                    return <CartItem key={i} data={v}/>
                }) }
            
        </View>
    )
};

/** Компонент корзины */
const Cart = (props) =>
{
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const {navigation} = props;

    return (
        <>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 1.0]}
                colors={["#E81C1C", "#E4724F"]}/>

                <Header {...props} title={"cartTitle"} titleFunc={() => { navigation.navigate('DeliveryDetails') }}/>
                <ScrollView
                    contentContainerStyle={{
                        justifyContent: "flex-start", alignItems:"center"
                    }}
                    style={styles.container}>
                        <CartIcon/>

                        <ItemsBlock/>

                        <CartTotal/>

                </ScrollView>
                <TouchableOpacity
                    activeOpacity={ !state.cartItems.length ? 1.0 : 0.2 }
                    style={!state.cartItems.length ? styles.button_disabled : styles.button_enabled}
                    onPress={()=>{
                        if ( state.cartItems.length )
                            navigation.navigate('DeliveryDetails');
                    }}>

                    <OurText style={styles.text_button} translate={true}>cartCheckout</OurText>
                </TouchableOpacity>
        </>
    );
};

export default Cart; 