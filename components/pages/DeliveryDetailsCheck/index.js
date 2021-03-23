import React, { useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import "react-native-get-random-values";
import { useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';
import {useDispatch, useSelector} from "react-redux";

import { AddOrderToList, ClearCart, ClearDeliveryDetails } from "~/actions";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "~/components/Header";
import { ORDER_STATUS_TO_BE_SHIPPED } from "~/components/pages/Orders/orderStates";
import { MUTATION_CREATE_ORDER } from "~/queries";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
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
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const { navigation } = props;
    const { data, isOrderMade } = props.route.params;
    const onError = (err) => {console.log("well shit", err)}
    const onCompleted = (data) => {console.log("Okay", data)}
    const [order, {loading, error}] = useMutation(MUTATION_CREATE_ORDER, {onError, onCompleted});

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

    const makeAnOrder = (e) => {
        const orderData = {
            deliveryDetails: {
                name: state.deliveryDetails.name.value,
                email: state.deliveryDetails.email.value,
                phone: state.deliveryDetails.phone.value,
                address: state.deliveryDetails.address.value,
                floor: state.deliveryDetails.floor.value,
                notes: state.deliveryDetails.notes.value,
                time: state.deliveryDetails.time.value,
            },
            uuid: uuidv4(),
            status:  ORDER_STATUS_TO_BE_SHIPPED,
            products: state.cartItems,
            totalPrice: state.cartTotalPrice,
        };
        dispatch(AddOrderToList(orderData));
        dispatch(ClearCart());
        dispatch(ClearDeliveryDetails());
        navigation.popToTop();
        navigation.navigate("Orders");
        order({
            variables: {
                clientMutationId: state.user.uuid,
                customerId: state.user.databaseId,
            },
        });
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <View style={styles.topContainer}>
            {
                !isOrderMade ?
                    <OurText style={styles.title} translate={true}>orderInfoCheck</OurText>
                : <></>
            }
            </View>
            <ScrollView>
                <DeliveryDetailsItem field={"orderFormName"}
                                     text={data.name}/>
                <DeliveryDetailsItem field={"orderFormEmail"}
                                     text={data.email}/>
                <DeliveryDetailsItem field={"orderFormPhone"}
                                     text={data.phone}/>
                <DeliveryDetailsItem field={"orderFormAddress"}
                                     text={data.address}/>
                <DeliveryDetailsItem field={"orderFormFloor"}
                                     text={data.floor}/>
                <DeliveryDetailsItem field={"orderFormNotes"}
                                     text={data.notes}/>
                <DeliveryDetailsItem field={"orderFormDeliveryTime"}
                                     text={data.time}/>
            </ScrollView>
            {
            !isOrderMade ?
                <View style={styles.bottomContainer}>
                    <OurTextButton style={styles.button} onPress={goToDetailsEdit} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckEdit</OurTextButton>
                    <OurTextButton style={styles.button} onPress={makeAnOrder} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
                </View>
                : <></>
            }
        </View>
        </>
    );
};

export default DeliveryDetailsCheck;