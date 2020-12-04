import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { View, KeyboardAvoidingView } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { STORE_ADDRESS } from "~/config";
import { stateContext, dispatchContext } from "~/contexts";
import { USER_STATUS_NOT_CHECKED, USER_STATUS_REGISTERED, USER_STATUS_UNREGISTERED, USER_STATUS_LOGGED } from "~/userStatus";
import { HeaderTitle, HeaderBackButton } from "~/components/Header";
import OurTextField from "~/components/OurTextField";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import OurTextButton from "~/components/OurTextButton";
import OurText from "~/components/OurText";
import styles from "./styles";

const RegisterPage = (props) => {
    const { navigation } = props;

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordRetype, setPasswordRetype] = useState("");
    const [loading, setLoading] = useState(false);
    const [gradStart, gradMiddle, gradEnd] = ["#B0E8E4", "#86A8E7","#7F7FD5"];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"registerPageTitle"}/>,
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
                        <KeyboardAvoidingView style={styles.topContainer}>
                            <OurTextField placeholder="email" />
                            <OurTextField placeholder="username" />
                            <OurTextField placeholder="password" />
                            <OurTextField placeholder="password retype" />
                        </KeyboardAvoidingView>
                        <View style={styles.bottomContainer}>
                            <OurTextButton style={styles.button} textStyle={{color: gradEnd, fontSize: 20}} translate={true}>welcomePageRegister</OurTextButton>
                        </View>
                    </View>
            }
        </>
    );
};

export default RegisterPage;