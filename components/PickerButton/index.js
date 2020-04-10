import React from "react";
import { TouchableOpacity, View } from "react-native";
import Svg, {Path} from "react-native-svg";
import OurText from "../OurText";
import styles from "./styles";

const PickerButton = (props) => {
    const { style, onPress, children } = props;
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={style ? style : styles.picker}>
                <OurText style={styles.text}>{children}</OurText>
                <Svg style={styles.icon} width="32" height="16" viewBox="0 0 320 512">
                    <Path id="chevron-left-solid"
                          data-name="chevron left-solid"
                          d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                          transform="translate(0 -2.25)"
                          fill="#fff"/>
                </Svg>
            </View>
        </TouchableOpacity>
    );
};

export default PickerButton;