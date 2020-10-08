import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const LONG_PRESS_DELAY = 200;

const OurIconButton = (props) => {
    const { onPress, doLongPress, longPressDelay, icon, size, children, style } = props;

    let timer = null;
    const onLongPress = (e) => {
        if ( doLongPress ) {
            timer = setInterval(() => {
                onPress(e);
            }, longPressDelay || LONG_PRESS_DELAY );
        }
    };
    const onPressOut = (e) => {
        if ( timer )
            clearInterval(timer);
    };

    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} onPressOut={onPressOut} style={ [styles.button, style] }>
            <FontAwesomeIcon size={size} color={"#fff"} icon={icon}/>
            {children}
        </TouchableOpacity>
    );
};

export default React.memo(OurIconButton);