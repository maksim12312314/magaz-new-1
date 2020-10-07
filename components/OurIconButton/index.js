import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const OurIconButton = (props) => {
    const { onPress, doLongPress, longPressDelay, icon, size, children } = props;

    let timer = null;
    const onLongPress = (e) => {
        if ( doLongPress ) {
            timer = setInterval(() => {
                onPress(e);
            }, longPressDelay || 200 );
        }
    };
    const onPressOut = (e) => {
        if ( timer )
            clearInterval(timer);
    };

    const style = props.style || {};
    return (
        <TouchableOpacity onPress={onPress} onLongPress={onLongPress} onPressOut={onPressOut} style={ {...styles.button, ...style} }>
            <FontAwesomeIcon size={size} color={"#fff"} icon={icon}/>
            {children}
        </TouchableOpacity>
    )
};

export default React.memo(OurIconButton);