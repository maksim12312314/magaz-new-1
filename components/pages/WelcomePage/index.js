import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { STORE_ADDRESS } from "~/config";
import { stateContext, dispatchContext } from "~/contexts";
import { USER_STATUS_NOT_CHECKED, USER_STATUS_REGISTERED, USER_STATUS_UNREGISTERED, USER_STATUS_LOGGED } from "~/userStatus";
import { HeaderTitle } from "~/components/Header";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import OurTextButton from "~/components/OurTextButton";
import OurText from "~/components/OurText";
import styles from "./styles";

const WelcomePage = (props) => {
    const { navigation } = props;

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const status = state.user.status;

    const [loading, setLoading] = useState(status === USER_STATUS_NOT_CHECKED);
    const [gradStart, gradMiddle, gradEnd] = ["#B0E8E4", "#86A8E7","#7F7FD5"];

    const navigateToRegister = (e) => {
        navigation.navigate("RegisterPage");
    };

    const navigateToLogin = (e) => {
        navigation.navigate("LoginPage");
    };

    useEffect( () => {
        console.log("HELLO STATUS", status)
        switch (status) {
            case USER_STATUS_REGISTERED: {
                setLoading(true);
                navigation.popToTop();
                navigation.navigate("CategoryList");
                break;
            };
            case USER_STATUS_LOGGED: {
                setLoading(false);
                navigation.popToTop();
                navigation.navigate("CategoryList");
                break;
            };
            case USER_STATUS_UNREGISTERED: {
                setLoading(false);
                break;
            };
            default:
                break;
        }
    }, [status]);

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=>{},
            headerCenter: (props)=>{},
            headerRight: (props)=>{},
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);

    return (
        <>
            <LinearGradient
                style={styles.background}
                locations={[0, .8, 1]}
                colors={[gradStart, gradMiddle, gradEnd]} />
            {
                loading ?
                    <OurActivityIndicator />
                :
                    <View style={styles.mainContainer}>
                        <View style={styles.topContainer}>
                            <OurText style={styles.title} translate={true}>welcomePageTitle</OurText>
                            <OurText style={styles.note} translate={true}>welcomePageNote</OurText>
                        </View>
                        <View style={styles.bottomContainer}>
                            <OurTextButton onPress={navigateToRegister} style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageRegister</OurTextButton>
                            <OurTextButton onPress={navigateToLogin} style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageLogin</OurTextButton>
                        </View>
                    </View>
            }
        </>
    );
};

export default WelcomePage;