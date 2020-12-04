import React, { useState, useLayoutEffect, useContext, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { STORE_ADDRESS } from "~/config";
import { getUserRegisterQuery, getUserLoginQuery } from "~/queries";
import { stateContext, dispatchContext } from "~/contexts";
import { USER_STATUS_REGISTERED } from "~/userStatus";
import { SetUserData } from "~/actions";
import { HeaderTitle } from "~/components/Header";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { randomString } from "~/utils";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import OurText from "~/components/OurText";
import styles from "./styles";

const UserCheck = (props) => {
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { navigation, nextPage } = props;
    const [gradStart, gradMiddle, gradEnd] = ["#B0E8E4", "#86A8E7","#7F7FD5"];

    const isRegistered = state.user.status === USER_STATUS_REGISTERED;
    const userUuid = uuidv4();
    const userName = randomString(32);
    const userPass = randomString(32);
    const regQuery = getUserRegisterQuery(userUuid, state.deliveryDetails.email.value, userName, userPass);
    console.log(regQuery);

    const fetchData = async () => {
        const res = await fetch(`${STORE_ADDRESS}graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: !isRegistered ? regQuery : 
                                    getUserLoginQuery(state.user.uuid, state.user.username, state.user.password),
        });
        const data = await res.json();
        console.log("HEHE DATA1", state.user);
        if ( data?.data?.registerUser.user ) {
            const userData = {
                status: USER_STATUS_REGISTERED, // Состояние пользователя
                uuid: userUuid,
                username: userName,
                email: state.deliveryDetails.email.value,
                password: userPass,
                jwtAuthToken: data.data.registerUser.user.jwtAuthToken,
                jwtRefreshToken: data.data.registerUser.user.jwtRefreshToken,
            }
            console.log("HEHE DATA", userData);
            dispatch(SetUserData(userData));
        } else {
            setError(data.message);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=>{},
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={"userCheckTitle"}/>,
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
                loading && !error ?
                    <OurActivityIndicator />
                :
                    <OurText>Something went wrong</OurText>
            }
        </>
    );
};

export default UserCheck;