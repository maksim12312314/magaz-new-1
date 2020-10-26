import React, { useState, useContext, useLayoutEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../../Header";
import { stateContext, dispatchContext } from "../../../contexts";
import { ChangeDeliveryField } from "../../../actions";
import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";
import OurTextField from "../../OurTextField";
import styles from "./styles";

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

        if ( value.trim() !== "" ||
                ( name === "phone" && value.toLowerCase().match(PHONE_PATTERN) ) ||
                name === "floor" || name === "notes" ) {
            dispatch(ChangeDeliveryField(name, value, true));
            return true;
        }
        dispatch(ChangeDeliveryField(name, value, false));
    };

    return (
        <>
        <LinearGradient style={styles.background} locations={[0, 1.0]} colors={["#1DC44F", "#3BF3AE"]}/>
        <View style={styles.mainContainer}>
            <KeyboardAvoidingView style={styles.infoContainer}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                {
                    state.deliveryDetails.map( (field, i ) => {
                    return <OurTextField name={field.name}
                                  defValue={field.value}
                                  onValidate={validateForm}
                                  placeholder={t(field.placeholder)}
                                  key={i}/>
                              })
                }
                </ScrollView>
            </KeyboardAvoidingView>
            <OurTextButton disabled={!state.allDetailsAreValid} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
        </View>
        </>
    );
};

export default DeliveryDetails;