import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styles from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const OurIconButton = (props) =>
{
    const { onPress, icon } = props;
    const size = props.size || 5;
    const style = props.style || {};
    return (
        <TouchableOpacity onPress={onPress} style={ {...styles.button, ...style} }>
            <FontAwesomeIcon size={
                Math.max(Dimensions.get("window").width, Dimensions.get("window").height) / size
            } color={"#fff"} icon={icon}/>
        </TouchableOpacity>
    )
};

export default OurIconButton;