import React, { useContext } from "react";
import { View } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { dispatchContext } from "../../../../contexts";
import OurImage from "../../../OurImage";

import {
    SetCategoryPageId,
} from "../../../../actions";
const address = config.getCell("StoreAddress");

/**Компонент категории */
const CategoryItem = (props) =>
{
    // Получаем имя, url картинки, навигацию и id из props
    const { name, imageUrl, navigation, id, cached } = props;
    const dispatch = useContext(dispatchContext);
    const url = imageUrl ? `${address}wp-content/uploads/${imageUrl}` : null;

    // Обрабатываем нажатие на иконку категории
    const onPress = (e) => {
        // Устанавливаем id данной категории
        // для отображения списка товаров
        // dispatch(SetCategoryPageId( {id, name} ));

        // Переходим к списку продуктов
        
        navigation.navigate("ProductList", {currentCategory:{id, name} });
    };

    return (
        <View style={styles.view}>
            <OurImage
                url={url}
                title={name}
                onPress={onPress}
                disabled={cached}
            />
        </View>
    );
};

export default CategoryItem;