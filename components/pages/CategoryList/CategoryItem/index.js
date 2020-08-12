import React, { useContext, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { dispatchContext, stateContext } from "../../../../contexts";
import OurText from "../../../OurText";
//import { TouchableOpacity } from "react-native-gesture-handler";

import {
    SetCategoryPageId,
} from "../../../../actions";
const address = config.getCell("StoreAddress");

/**Компонент категории */
const CategoryItem = (props) =>
{
    // Получаем имя, url картинки, навигацию и id из props
    const { name, imageUrl, navigation, id } = props;
    const dispatch = useContext(dispatchContext);

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.container} onPress={(e) =>
            {
                // Обрабатываем нажатие на иконку категории
                // и устанавливаем id данной категории
                // для отображения списка товаров
                dispatch(SetCategoryPageId( {id, name} ));
                
                // Переходим к списку продуктов
                navigation.navigate("ProductList");
                
            }}>
                <Image
                    style={styles.picture}
                    source={{
                        uri: imageUrl ? `${address}wp-content/uploads/` + imageUrl
                                    :  `${address}wp-content/uploads/woocommerce-placeholder.png`
                    }}
                />
                <View style={styles.textView}><OurText style={styles.title}>{name}</OurText></View>
            </TouchableOpacity>
        </View>
    );
}

export default CategoryItem;