import React, {useContext, useLayoutEffect} from "react";
import { stateContext } from "../../../contexts";
import { View, FlatList } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import Header, {HeaderBackButton, HeaderCartButton, HeaderTitle} from "../../Header/index";
import OurTextButton from "../../OurTextButton";

/** Компонент блока товаров  */
const ItemsBlock = ({item})=> {    
    return (
        <CartItem productId={item.productId} count={item.count}/>
    );
};

/** Компонент корзины */
const Cart = (props) =>
{
    const state = useContext(stateContext);
    const { navigation } = props;
    const [gradStart, gradEnd] = ["#E81C1C", "#E4724F"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"cartTitle"}/>,
            headerRight: (props)=>{},
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const toDeliveryDetails = (e)=> {
        if ( state.cartItems.length )
            navigation.navigate('DeliveryDetails');
    };

    return (
        <>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]}/>

                <View style={styles.items}>
                    <View style={styles.cartIcon}>
                        <FontAwesomeIcon size={42} color={"#fff"} icon={faShoppingBasket}/>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.cartList}
                        data={Array.from(state.cartItems.values())}
                        renderItem={ItemsBlock}
                        keyExtractor={(item) => String(item.productId)}/>
                    <CartTotal />
                    <OurTextButton
                        translate={true}
                        disabled={!state.cartItems.size}
                        onPress={toDeliveryDetails}
                        style={styles.checkoutButton}
                        >cartCheckout</OurTextButton>
                </View>
        </>
    );
};

export default Cart; 