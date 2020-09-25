import React from "react";
import { ActivityIndicator, View } from "react-native";
import OurText from "../OurText";
import styles from "./styles";

const OurActivityIndicator = (props) => {
    const { text, translate } = props;
    return (
        <View style={styles.container}>
            {
                !text ?
                    <ActivityIndicator style={styles.indicator} color={"#fff"} size={64}/>
                :
                    <OurText translate>{text}</OurText>
            }
        </View>
    );
};

export default OurActivityIndicator;