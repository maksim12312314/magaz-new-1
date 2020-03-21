import React from "react";
import { Text } from "react-native";

const OurText = (props) =>
{
    const { style, children } = props;
    return (
        <Text style={style} allowFontScaling={false}>{children}</Text>
    );
};

export default OurText;