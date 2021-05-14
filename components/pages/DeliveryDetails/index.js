import React, { useState, useLayoutEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { ChangeDeliveryField } from "~/redux/DeliveryDetailsReducer/actions";
import { PHONE_PATTERN, EMAIL_PATTERN } from "~/utils/patterns";

import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "~/components/Header";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OurTextField from "~/components/OurTextField";
import styles from "./styles";

import {Formik, Form, Field} from "formik"

const DeliveryDetails = (props) => {
    const state = useSelector(state=>state.deliveryDetailsReducer);
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
            firstname: state.deliveryDetails.firstname.value,
            lastname: state.deliveryDetails.lastname.value,
            email: state.deliveryDetails.email.value,
            phone: state.deliveryDetails.phone.value,
            address: state.deliveryDetails.address.value,
            postcode: state.deliveryDetails.postcode.value,
            notes: state.deliveryDetails.notes.value,
        };
        navigation.navigate("DeliveryDetailsCheck", { data: deliveryDetails, isOrderMade: false });
    };


    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        postcode: "",
        notes: ""
    }

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={[gradStart, gradEnd]}/>
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView style={styles.infoContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.details}>
                    <Formik
                        initialValues = {initialValues}
                    >
                        <Form>
                            <Field name="firstname"
                                        autoCompleteType="name"
                                        defValue={state.deliveryDetails.firstname.value}
                                        onValidate={validateForm}
                                        placeholder={t("orderFormFirstName")}/>
                            <Field name="lastname"
                                        autoCompleteType="name"
                                        defValue={state.deliveryDetails.lastname.value}
                                        onValidate={validateForm}
                                        placeholder={t("orderFormLastName")}/>
                            <Field name="email"
                                        keyboardType="email-address"
                                        autoCompleteType="email"
                                        defValue={state.deliveryDetails.email.value}
                                        onValidate={validateFormEmail}
                                        placeholder={t("orderFormEmail")}/>
                            <Field name="phone"
                                        keyboardType="phone-pad"
                                        autoCompleteType="tel"
                                        defValue={state.deliveryDetails.phone.value}
                                        onValidate={validateFormPhone}
                                        placeholder={t("orderFormPhone")}/>
                            <Field name="address"
                                        autoCompleteType="street-address"
                                        defValue={state.deliveryDetails.address.value}
                                        onValidate={validateForm}
                                        placeholder={t("orderFormAddress")}/>
                            <Field name="postcode"
                                        autoCompleteType={"postal-code"}
                                        defValue={state.deliveryDetails.postcode.value}
                                        onValidate={validateForm}
                                        placeholder={t("orderFormPostcode")}/>
                            <Field name="notes"
                                        defValue={state.deliveryDetails.notes.value}
                                        onValidate={validateForm}
                                        placeholder={t("orderFormNotes")}/>
                        </Form>
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
            <View style={styles.bottomContainer}>
                <OurTextButton disabled={!state.allFieldsAreValid} onPress={goToDetailsCheck} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
            </View>
        </View>
        </>
    );
};

export default DeliveryDetails;