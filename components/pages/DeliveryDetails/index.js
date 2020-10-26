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
	const [isButtonLocked, setButtonLocked] = useState(false);

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
    	setButtonLocked(true);
    };
    const validateFormEmpty = (value, name) => {
    	dispatch(ChangeDeliveryField(name, value));
    	return true;
    };
    const validateFormPhone = (value, name) => {
    	const PHONE_PATTERN = /^((\+7|7|8)+([0-9]){10})$/;

    	if ( value.toLowerCase().match(PHONE_PATTERN) ) {
    		dispatch(ChangeDeliveryField(name, value));
    		return true;
    	}
    	setButtonLocked(true);
    };

	return (
		<>
		<LinearGradient style={styles.background} locations={[0, 1.0]} colors={["#1DC44F", "#3BF3AE"]}/>
		<View style={styles.mainContainer}>
			<KeyboardAvoidingView style={styles.infoContainer}>
				<ScrollView contentContainerStyle={styles.scrollView}>
					<OurTextField name={"name"} defValue={state.deliveryDetails.name.value} validate={validateForm} placeholder={t("orderFormName")}/>
					<OurTextField name={"phone"} defValue={state.deliveryDetails.phone.value} validate={validateFormPhone} placeholder={t("orderFormPhone")}/>
					<OurTextField name={"address"} defValue={state.deliveryDetails.address.value} validate={validateForm} placeholder={t("orderFormAddress")}/>
					<OurTextField name={"floor"} defValue={state.deliveryDetails.floor.value} validate={validateFormEmpty} placeholder={t("orderFormFloor")}/>
					<OurTextField name={"notes"} defValue={state.deliveryDetails.notes.value} validate={validateFormEmpty} placeholder={t("orderFormNotes")}/>
					<OurTextField name={"time"} defValue={state.deliveryDetails.time.value} validate={validateForm} placeholder={t("orderFormDeliveryTime")}/>
				</ScrollView>
			</KeyboardAvoidingView>
			<OurTextButton disabled={isButtonLocked} textStyle={{color: gradEnd}} translate={true}>orderInfoCheckOrder</OurTextButton>
		</View>
		</>
	);
};

export default DeliveryDetails;