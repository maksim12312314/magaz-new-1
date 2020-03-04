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
                ? <OurText style={{color: "#FFF"}}>Товаров нет</OurText>
                : state.cartItems.map( (v, i) =>
                {
                    return <CartItem key={i} data={v}/>
                }) }
            
        </View>
    )
}

/** Компонент корзины */
const Cart = (props) =>
{
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const {navigation} = props;
    
    return (
        <>
        <LinearGradient
            style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            minHeight: Dimensions.get("window").height,
            }}
            locations={[0, 1.0]} 
            colors={["#E81C1C", "#E4724F"]}/>
        <ScrollView contentContainerStyle={{justifyContent: "flex-start", alignItems:"center"}} style={styles.container}>
            
                <Header {...props} showBack={true} showTitle={"Заказы"} titleFunc={() => { navigation.navigate('DeliveryDetails') }}/>
                <CartIcon/>
                
                <ItemsBlock/>
                
                <CartTotal/>
                <TouchableOpacity
                    activeOpacity={ !state.cartItems.length ? 1.0 : 0.2 }
                    style={!state.cartItems.length ? styles.button_disabled : styles.button_enabled}
                    onPress={()=>{
                        if ( state.cartItems.length )
                            navigation.navigate('Orders');
                    }}>

                    <OurText style={styles.text_button}>Оформить заказ</OurText>
                </TouchableOpacity>
                
		</ScrollView>
        </>
    );
}

export default Cart; 