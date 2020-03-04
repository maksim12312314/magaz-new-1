import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Dimensions, Alert } from "react-native";
import { stateContext, dispatchContext } from "../../../../../contexts";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faMinusCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import styles from "./styles";

const ItemControlButton = (props) =>
{
    const { onPress, icon } = props;
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <FontAwesomeIcon size={
                Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05
                } color={"#fff"} icon={icon}/>
        </TouchableOpacity>
    )
}

/** Компонент, который отображает количество товаров в корзине */
const ItemCount = (props) =>
{
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const {count, id} = props;

    return (
        <View style={styles.container}>
            <View style={styles.itemControl}>
                <ItemControlButton icon={faPlusCircle} onPress={(e) =>
                {
                    // Добавляем 1 товар 
                    dispatch({type: "plus", payload: id});
                    // Расчитываем итог
                    dispatch({type: "ComputeTotalPrice"});
                }}/>
                <ItemControlButton icon={faMinusCircle} onPress={(e) =>
                {
                    // Вычитаем 1 товар
                    dispatch({type: "minus", payload: id, dispatch: dispatch});
                    // Расчитываем итог
                    dispatch({type: "ComputeTotalPrice"});
                }}/>
                <ItemControlButton icon={faTimesCircle} onPress={(e) =>
                {
                    Alert.alert("УдОлить элементы", "Хотите удОлитЪ?", [
                        {
                            text: "Отмена",
                            style: "cancel"
                        },
                        {
                            text: "OK",
                            onPress: () => {
                                dispatch({type: "DeleteFromCart", payload: id, showAlert: true});
                                dispatch({type: "ComputeTotalPrice"});
                            },
                        },,
                    ],
                    {cancelable: false});
                }}/>
            </View>
        </View>
    );
}

export default ItemCount; 