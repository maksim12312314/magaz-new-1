import React, { useContext, useEffect, useState }  from "react";
import { Animated, Dimensions, View, LayoutAnimation } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { dispatchContext } from "~/contexts";
import { DeleteToast } from "~/actions";
import OurText from "~/components/OurText";
import styles from "./styles";

const easeIn = LayoutAnimation.create(
    200,
    LayoutAnimation.Types.easeIn,
    LayoutAnimation.Properties.scaleY,
)
const animConfigIn = {
    toValue: 1,
    duration: 200,
    useNativeDriver: true,
};
const animConfigOut = {
    toValue: 0,
    duration: 200,
    useNativeDriver: true,
};
const animConfigOutPos = {
    toValue: -1,
    duration: 200,
    useNativeDriver: true,
};

const ToastItem = (props) => {
    const { id, duration, text, icon, color, translate } = props;
    const dispatch = useContext(dispatchContext);
    const [timer, setTimer] = useState(null);
    const [anim, setAnim] = useState(new Animated.Value(0));
    const [posAnim, setPosAnim] = useState(new Animated.Value(1));
    const [height, setHeight] = useState(0);

    useEffect(() => {
        console.log("WTF", id, timer)
        LayoutAnimation.configureNext(easeIn);
        setHeight(48);
        Animated.timing(anim, animConfigIn).start();
        Animated.timing(posAnim, animConfigOut).start();

        if ( timer ) {
            clearTimeout(timer);
            console.log("CLEARED TIMER");
        }
        
        setTimer(setTimeout(() => {
            LayoutAnimation.configureNext(easeIn);
            setHeight(0.001);
            Animated.timing(posAnim, animConfigOutPos).start();
            Animated.timing(anim, animConfigOut).start(()=>dispatch(DeleteToast(id)));
        }, duration));

    }, [duration]);

    return (
        <Animated.View style={[styles.mainContainer, {height, opacity: anim, transform: [{ translateX: Animated.multiply(Dimensions.get("screen").width, posAnim) }] }]}>
            <>
            {
                icon ?
                    <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={icon} size={32} color={color} />
                    </View>
                :   <></>
            }
            </>
            <View style={styles.textContainer}>
                <OurText style={[styles.text, {color}]} translate={translate}>{text}</OurText>
            </View>
        </Animated.View>
    );
};

export default React.memo(ToastItem);