import React, { useContext, useEffect, useState, useRef }  from "react";
import { Animated, Easing, Dimensions, View, LayoutAnimation } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { dispatchContext } from "~/contexts";
import { DeleteToast } from "~/actions";
import OurText from "~/components/OurText";
import styles from "./styles";

const ANIMATION_DURATION = 200;
const TOAST_HEIGHT_MIN = .00001;
const TOAST_HEIGHT_MAX = 64;

const easeInEaseOut = LayoutAnimation.create(
    ANIMATION_DURATION,
    LayoutAnimation.Types.easeInEaseOut,
    LayoutAnimation.Properties.scaleY,
);

const ToastItem = (props) => {
    const { id, duration, text, icon, color, translate } = props;
    const dispatch = useContext(dispatchContext);
    const [timer, setTimer] = useState(null);
    const [height, setHeight] = useState(TOAST_HEIGHT_MIN);
    const opacity = useRef(new Animated.Value(0)).current;
    const posX = useRef(new Animated.Value(Dimensions.get("screen").width)).current;
    
    // Анимация появления
    const animIn = () => {
        // Анимируем высоту
        LayoutAnimation.configureNext(easeInEaseOut);
        setHeight(TOAST_HEIGHT_MAX);
        
        // Изменяем прозрачность до 1
        Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
        // Изменяем позицию до 0
        Animated.timing(posX, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
    };

    // Анимация исчезновения
    const animOut = () => {
        // Анимируем высоту
        LayoutAnimation.configureNext(easeInEaseOut);
        setHeight(TOAST_HEIGHT_MIN);
        
        // Изменяем позицию до -100%
        Animated.timing(posX, {
            toValue: -Dimensions.get("screen").width,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start();
        // Изменяем прозрачность до 0
        Animated.timing(opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
        }).start( () => {
            // Удаляем элемент после окончания анимации
            dispatch(DeleteToast(id));
        } );
    };

    useEffect(() => {
        animIn();

        if ( timer ) {
            clearTimeout(timer);
        }
        
        setTimer(setTimeout(() => {
            animOut();
        }, duration));

    }, [duration]);

    return (
        <Animated.View style={[styles.mainContainer, {height, opacity, transform: [{ translateX: posX }] }]}>
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