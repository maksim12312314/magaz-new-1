import React, { useState } from "react";
import { View, TextInput, LayoutAnimation, Platform, UIManager } from "react-native";
import OurText from "../OurText";
import styles from "./styles";

if ( Platform.OS === "android" )
    if ( UIManager.setLayoutAnimationEnabledExperimental )
        UIManager.setLayoutAnimationEnabledExperimental(true);

const VALIDATE_TIME = 1100;

const OurTextField = (props) => {
    const { name, validateTime, defText, placeholder, validate } = props;

    const [text, setText] = useState(defText || "");
    const [isFocused, setFocus] = useState(false);
    const [isValid, setValid] = useState(true);

    let validateTimer = null;

    const onFocus = () => {
        setFocus(true);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    };
    const onBlur = () => {
        if ( !text ) {
            setFocus(false);
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
        }
    };
    const onChangeText = (value) => {
        clearTimeout(validateTimer);
        setText(value);

        if ( validate ) {
            validateTimer = setTimeout( () => {
                setValid(validate(value, name) || false);
            }, validateTime || VALIDATE_TIME);
        }
    };

    return (
        <View style={styles.mainContainer}>
            <OurText style={[styles.placeholder,
                isFocused ? styles.placeholderFocused : styles.placeholderUnfocused,
                isValid ? styles.placeholderValid : styles.placeholderNotValid]}>{placeholder}</OurText>
            <TextInput style={[styles.textInput, isValid ? styles.textInputValid : styles.textInputNotValid]}
                       onChangeText={onChangeText}
                       onFocus={onFocus}
                       onBlur={onBlur}
                       value={text}/>
        </View>
    )   
};

export default React.memo(OurTextField);