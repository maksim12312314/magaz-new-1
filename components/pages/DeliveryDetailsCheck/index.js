import React, { useState, useContext, useLayoutEffect } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { HeaderBackButton, HeaderTitle, HeaderCartButton } from "../../Header";
import { stateContext, dispatchContext } from "../../../contexts";

import OurText from "../../OurText";
import OurTextButton from "../../OurTextButton";

import styles from "./styles";

const DeliveryDetailsItem = (props) => {
    const { field, text } = props;
    return (
        <View style={styles.itemContainer}>
            <OurText style={styles.fieldText} translate={true}>{field}</OurText>
            <OurText style={styles.text}>{text}</OurText>
        </View>
    )
}

const DeliveryDetailsCheck = (props) => {
    const state = useContext(stateContext);
    const { navigation } = props;
    const {t} = useTranslation()

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
                <OurTextButton style={[styles.button, {paddingHorizontal: 45}]} onPress={goToDetailsEdit} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckEdit</OurTextButton>
                <OurTextButton style={styles.button} onPress={goToDetailsEdit} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
            </View>
        </View>
        </>
    );
};

export default DeliveryDetailsCheck;