import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, ActivityIndicator, View, Animated, Dimensions, Easing } from "react-native";
import OurText from "~/components/OurText";
import OurTextButton from "~/components/OurTextButton";
import styles from "./styles";

const ANIMATION_DURATION = 500;

const OurActivityIndicator = (props) => {
    const { error, abortController, doRefresh, translate, params, buttonTextColor, size } = props;
    const [opacity] = useState(new Animated.Value(0));
    const [posX] = useState(new Animated.Value(Dimensions.get("screen").width));
    
    const [aborted, setAborted] = useState(false);

    useEffect(() => {
        Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();

        Animated.timing(posX, {
            toValue: 0,
            easing: Easing.bounce,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    }, [error, aborted])

    const onLongPress = (e) => {
        if ( abortController && !abortController.signal.aborted ) {
            abortController.abort();
            setAborted(true);
        }
    };
    return (
        <View style={styles.container}>
            {
                aborted ?
                    <Animated.View style={{opacity, transform: [{ translateX: posX }]}}>
                        <OurText translate={true} style={styles.abortText}>activityAborted</OurText>
                        <OurTextButton onPress={(e)=>{
                            setAborted(false);
                            doRefresh();
                        }} translate={true} textStyle={{color: buttonTextColor, paddingHorizontal: 32}}>activityRefresh</OurTextButton>
                    </Animated.View>
                    : error ?
                    <Animated.View style={{opacity, transform: [{ translateX: posX }]}}>
                        <OurText translate={true} style={styles.abortText}>activityError</OurText>
                        <OurTextButton onPress={(e)=>{
                            doRefresh();
                        }} translate={true} textStyle={{color: buttonTextColor, paddingHorizontal: 32}}>activityRefresh</OurTextButton>
                    </Animated.View>
                    :
                        <TouchableOpacity onLongPress={onLongPress} delayLongPress={100}>
                            <ActivityIndicator size={size || 64} style={styles.indicator} color={"#fff"}/>
                        </TouchableOpacity>
            }
        </View>
    );
};

export default React.memo(OurActivityIndicator);