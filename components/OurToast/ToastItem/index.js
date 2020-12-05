import React from "react";
import { View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import OurText from "~/components/OurText";
import styles from "./styles";

const ToastItem = (props) => {
    const { icon, text, color, translate } = props;

    return (
        <View style={styles.mainContainer}>
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
        </View>
    );
};

export default ToastItem;