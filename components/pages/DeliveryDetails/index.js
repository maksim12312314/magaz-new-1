import React, { useState, useLayoutEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from "react-redux";

import { PHONE_PATTERN, EMAIL_PATTERN } from "~/patterns";
import { ChangeDeliveryField } from "~/actions";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "~/components/Header";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OurTextField from "~/components/OurTextField";
import styles from "./styles";

const DeliveryDetails = (props) => {
    const state = useSelector(state=>state);
    const dispatch = useDispatch();
    const { navigation } = props;
    const { t } = useTranslation();
    const [gradStart, gradEnd] = ["#1DC44F", "#3BF3AE"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"deliveryDetailsTitle"} />,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    const validateForm = (value, name) => {
        if ( value.trim() !== "" ) {
            dispatch(ChangeDeliveryField(name, value));
            return true;
        }
        dispatch(ChangeDeliveryField(name, value, false));
    };
    const validateFormEmail = (value) => {
        if ( value.trim() !== "" ) {
            if ( value.toLowerCase().match(EMAIL_PATTERN) ) {
                dispatch(ChangeDeliveryField("email", value));
                return true;
            }
        }
        dispatch(ChangeDeliveryField("email", value, false));
    };
    const validateFormPhone = (value) => {
        if ( value.trim() !== "" ) {
            if ( value.toLowerCase().match(PHONE_PATTERN) ) {
                dispatch(ChangeDeliveryField("phone", value));
                return true;
            }
        }
        dispatch(ChangeDeliveryField("phone", value, false));
    };

    const goToDetailsCheck = (e) => {
        const deliveryDetails = {
            name: state.deliveryDetails.name.value,
            email: state.deliveryDetails.email.value,
            phone: state.deliveryDetails.phone.value,
            address: state.deliveryDetails.address.value,
            floor: state.deliveryDetails.floor.value,
            notes: state.deliveryDetails.notes.value,
            time: state.deliveryDetails.time.value,
        };
        navigation.navigate("DeliveryDetailsCheck", { data: deliveryDetails, isOrderMade: false });
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView style={styles.infoContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.details}>
                    <OurTextField name="name"
                                  autoCompleteType="name"
                                  defValue={state.deliveryDetails.name.value}
                                  onValidate={validateForm}
                                  placeholder={t("orderFormName")}/>
                    <OurTextField name="email"
                                keyboardType="email-address"
                                autoCompleteType="email"
                                defValue={state.user.email || state.deliveryDetails.email.value}
                                onValidate={validateFormEmail}
                                placeholder={t("orderFormEmail")}/>
                    <OurTextField name="phone"
                                keyboardType="phone-pad"
                                autoCompleteType="tel"
                                defValue={state.deliveryDetails.phone.value}
                                onValidate={validateFormPhone}
                                placeholder={t("orderFormPhone")}/>
                    <OurTextField name="address"
                                autoCompleteType="street-address"
                                defValue={state.deliveryDetails.address.value}
                                onValidate={validateForm}
                                placeholder={t("orderFormAddress")}/>
                    <OurTextField name="floor"
                                keyboardType="phone-pad"
                                defValue={state.deliveryDetails.floor.value}
                                onValidate={validateForm}
                                placeholder={t("orderFormFloor")}/>
                    <OurTextField name="time"
                                defValue={state.deliveryDetails.time.value}
                                onValidate={validateForm}
                                placeholder={t("orderFormDeliveryTime")}/>
                    <OurTextField name="notes"
                                defValue={state.deliveryDetails.notes.value}
                                onValidate={validateForm}
                                placeholder={t("orderFormNotes")}/>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.bottomContainer}>
                <OurTextButton disabled={!state.allDetailsAreValid} onPress={goToDetailsCheck} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
            </View>
        </View>
        </>
    );
};

export default DeliveryDetails;