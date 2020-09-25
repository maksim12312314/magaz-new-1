import React, { useContext } from "react";
import { View, Dimensions, Alert } from "react-native";
import { stateContext, dispatchContext } from "../../../../../contexts";
import { faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./styles";
import { useTranslation } from "react-i18next";
import OurIconButton from "../../../../OurIconButton";

import {
    Plus,
    Minus,
    DeleteFromCart,
    ComputeTotalPrice,
} from "../../../../../actions";


/** Компонент, который отображает количество товаров в корзине */
const ItemCount = (props) =>
{
    const dispatch = useContext(dispatchContext);
    const {id} = props;
    const { t } = useTranslation();

    const plusPressed = (e) => {
        // Добавляем 1 товар
        dispatch(Plus(id));
        dispatch(ComputeTotalPrice());
    };
    const minusPressed = (e) => {
        // Вычитаем 1 товар
        dispatch(Minus(id, dispatch, t));
        dispatch(ComputeTotalPrice());
    };
    const deletePressed = (e) => {
        Alert.alert(t("cartDeleteTitle"), t("cartDeleteMessage"), [
                {
                    text: t("cancel"),
                    style: "cancel"
                },
                {
                    text: t("ok"),
                    onPress: () => {
                        dispatch(DeleteFromCart(id, true));
                        dispatch(ComputeTotalPrice());
                    },
                },
            ],
            {cancelable: false});
    };

    return (
        <View style={styles.container}>
            <View style={styles.itemControl}>
                <OurIconButton size={Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05}
                               style={{margin: 1}}
                               icon={faPlusCircle}
                               onPress={plusPressed}/>
                <OurIconButton size={Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05}
                               style={{margin: 1}}
                               icon={faMinusCircle}
                               onPress={minusPressed}/>
                <OurIconButton size={Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05}
                               style={{margin: 1}}
                               icon={faTimesCircle}
                               onPress={deletePressed}/>
            </View>
        </View>
    );
}

export default ItemCount; 