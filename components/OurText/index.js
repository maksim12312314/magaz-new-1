import React from "react";
import { Text } from "react-native";

const OurText = (props) =>
{
    const { fontSize, style } = props;
    const DEFAULT_FONT_SIZE = 12;
    return (
        <Text style={style} fontSize={fontSize ? fontSize : DEFAULT_FONT_SIZE} >{props.children}</Text>
    );
};

export default OurText;