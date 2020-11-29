import React, { useState, useContext, useLayoutEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { stateContext, dispatchContext } from "~/contexts";
import { ChangeDeliveryField } from "~/actions";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "~/components/Header";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import OurTextField from "~/components/OurTextField";
import styles from "./styles";

const KEYBOARD_TYPES = {
    email: "email-address",
    phone: "phone-pad",
};
const fieldToKeyboardType = (field) => {
    return KEYBOARD_TYPES[field];
};

const AUTO_COMPLETE_TYPES = {
    email: "email",
    phone: "tel",
};
const fieldToCompleteType = (field) => {
    return AUTO_COMPLETE_TYPES[field];
};

const DeliveryDetails = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
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
        const PHONE_PATTERN = /^((\+7|7|8)+([0-9]){10})$/;
        const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if ( value.trim() !== "" ) {
            if ( !( name === "phone" && !value.toLowerCase().match(PHONE_PATTERN) ) ) {
                dispatch(ChangeDeliveryField(name, value));
                return true;
            }
            if ( !( name === "email" && !value.toLowerCase().match(EMAIL_PATTERN) ) ) {
                dispatch(ChangeDeliveryField(name, value));
                return true;
            }
        }
        dispatch(ChangeDeliveryField(name, value, false));
    };

    const goToDetailsCheck = (e) => {
        const deliveryDetails = {
            name: state.deliveryDetails.name.value,
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
                {
                    Object.keys(state.deliveryDetails).map( (fieldName, i ) => {
                    return <OurTextField name={state.deliveryDetails[fieldName].name}
                                  autoCompleteType={fieldToCompleteType(fieldName)}
                                  keyboardType={fieldToKeyboardType(fieldName)}
                                  defValue={state.deliveryDetails[fieldName].value}
                                  onValidate={validateForm}
                                  placeholder={t(state.deliveryDetails[fieldName].placeholder)}
                                  key={i}/>
                              })
                }
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