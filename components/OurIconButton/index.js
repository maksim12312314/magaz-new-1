import React from "react";
import { Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const LONG_PRESS_DELAY = 200;

const OurIconButton = (props) => {
    const { onPress, doLongPress, longPressDelay, icon, width, height, children, style } = props;
    const image = Image.resolveAssetSource(icon);

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
            <Image style={{width: width|| height, height: height || width, resizeMode: "contain"}} source={{uri: Image.resolveAssetSource(icon).uri}}/>
            {children}
        </TouchableOpacity>
    );
};

export default React.memo(OurIconButton);