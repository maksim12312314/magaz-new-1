import React, { useContext, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../../Header";
import { stateContext, dispatchContext } from "../../../contexts";
import { AddOrderToList } from "../../../actions";
import { ORDER_STATUS_TO_BE_SHIPPED } from "../Orders";

import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";

import styles from "./styles";

const DeliveryDetailsItem = (props) => {
    const { field, text } = props;
    return (
        <View style={styles.itemContainer}>
            <OurText style={styles.fieldText} translate={true}>{field}</OurText>
            <OurText style={styles.text} translate={!text}>{text || "notAvailable"}</OurText>
        </View>
    )
}

const DeliveryDetailsCheck = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const { navigation } = props;

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const goToDetailsEdit = (e) => {
        navigation.navigate("DeliveryDetails");
    };

    const goToOrders = (e) => {
        const orderData = {
            deliveryDetails: state.deliveryDetails,
            status:  ORDER_STATUS_TO_BE_SHIPPED,
            products: state.cartItems,
            totalPrice: state.cartTotalPrice,
        };
        dispatch(AddOrderToList(orderData));
        navigation.navigate("Orders");
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
                <OurText style={styles.title} translate={true}>orderInfoCheck</OurText>
            </View>
            <ScrollView>
            {
                state.deliveryDetails.map( (field, i ) => <DeliveryDetailsItem field={field.placeholder} text={field.value} key={i} />)
            }
            </ScrollView>
            <View style={styles.bottomContainer}>
                <OurTextButton style={styles.button} onPress={goToDetailsEdit} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckEdit</OurTextButton>
                <OurTextButton style={styles.button} onPress={goToOrders} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
            </View>
        </View>
        </>
    );
};

export default DeliveryDetailsCheck;