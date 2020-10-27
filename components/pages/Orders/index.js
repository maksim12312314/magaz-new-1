import React, { useState, useContext, useLayoutEffect } from "react";
import { Animated, FlatList, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { HeaderBackButton, HeaderCartButton, HeaderTitle } from "./../../Header/index";
import { stateContext } from "../../../contexts";
import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";
import styles from "./styles";

export const ORDER_STATUS_TO_BE_SHIPPED = 0;
export const ORDER_STATUS_SHIPPED 		= 1;
export const ORDER_STATUS_CANCELED 		= 2;

const LocallyAnimatedFlatList = ({data}) => {
    const [x, setX] = useState(new Animated.Value(0));
    const [y, setY] = useState(new Animated.Value(0));
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { x, y } } }], {
        useNativeDriver: true,
    });
    
    const renderItemsBlock = ({item, index}) => {
    	console.log("HELLO", item);
        return (
            <OurText style={styles.emptyText} translate={true}>item.deliveryDetails[0].placeholder</OurText>
        );
    };

    return (
        <Animated.FlatList
            contentContainerStyle={styles.cartList}
            data={data}
            renderItem={renderItemsBlock}
            keyExtractor={(item, index) => String(index)}

            {...{ onScroll }}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

const Orders = (props) => {
    const state = useContext(stateContext);
    const { navigation } = props;

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"ordersTitle"}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
        {
        	state.orders.size === 0 ?
        		<View style={styles.emptyTextContainer}>
        			<OurText style={styles.emptyText} translate={true}>ordersEmpty</OurText>
        		</View>
        	:
        		<MemoedLocallyAnimatedFlatList data={state.orders}/>
        }
        </View>
        </>
    );
};

export default Orders;