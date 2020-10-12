import React, {useContext, useLayoutEffect} from "react";
import { stateContext } from "../../../contexts";
import { View, FlatList, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import styles from "./styles";
import { HeaderBackButton, HeaderTitle } from "../../Header/index";
import OurTextButton from "../../OurTextButton";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocallyAnimatedFlatList = ({data}) => {
    const x = new Animated.Value(0);
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x, y } } }], {
        useNativeDriver: true,
    });

    const renderItemsBlock = ({item, index}) => {
        return (
            <CartItem x={x} y={y} index={index} productId={item.productId} name={item.name} price={item.price} count={item.count}/>
        );
    };

    return (
        <AnimatedFlatList
            contentContainerStyle={styles.cartList}
            data={data}
            renderItem={renderItemsBlock}
            keyExtractor={(item) => String(item.productId)}

            {...{ onScroll }}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

/** Компонент корзины */
const Cart = (props) => {
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
        if ( state.cartItems?.size )
            navigation.navigate("DeliveryDetails");
    };

    return (
        <>
            <LinearGradient
                style={styles.gradient}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]}/>

                <View style={styles.items}>
                    <MemoedLocallyAnimatedFlatList data={Array.from(state.cartItems.values())}/>
                    <CartTotal />
                    <OurTextButton
                        translate={true}
                        disabled={!state.cartItems.size}
                        onPress={toDeliveryDetails}
                        style={styles.checkoutButton}
                        textStyle={{color: gradEnd}}
                        >cartCheckout</OurTextButton>
                </View>
        </>
    );
};

export default Cart; 