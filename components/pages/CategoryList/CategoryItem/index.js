import React, { useContext, useEffect } from "react";
import { Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { dispatchContext, stateContext } from "../../../../contexts";
import OurText from "../../../OurText";
//import { TouchableOpacity } from "react-native-gesture-handler";

const address = config.getCell("StoreAddress");

/**Компонент категории */
const CategoryItem = (props) =>
{
    // Получаем имя, url картинки, навигацию и id из props
    const { name, imageUrl, navigation, id } = props;
    const dispatch = useContext(dispatchContext);

    return (
        <TouchableOpacity style={styles.container} onPress={(e) =>
        {
            // Обрабатываем нажатие на иконку категории
            // и устанавливаем id данной категории
            // для отображения списка товаров
            dispatch({type: "SetCategoryPageId", payload: {id, name} });
            
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
            <OurText style={styles.title}>{name}</OurText>
        </TouchableOpacity>
    );
}

export default CategoryItem;