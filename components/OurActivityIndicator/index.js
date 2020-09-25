import React from "react";
import { ActivityIndicator } from "react-native";
import OurText from "./OurText";
import View from "react-native-web/src/exports/View";

const ActivityIndicator = (props) => {
    const { error } = props;
    return (
        <View>
            {
                !error ?
                    <ActivityIndicator/>
                :
                    <OurText ></OurText>
            }
        </View>
    );
};

export default ActivityIndicator;