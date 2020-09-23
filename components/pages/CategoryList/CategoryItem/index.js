import React, { useContext } from "react";
import { View } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { dispatchContext } from "../../../../contexts";
import OurImage from "../../../OurImage";
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
    const url = imageUrl ? `${address}wp-content/uploads/${imageUrl}` : null;

    return (
        <View style={styles.view}>
            <OurImage
                url={url}
                title={name}
                onPress={(e) => {
                        // Обрабатываем нажатие на иконку категории
                        // и устанавливаем id данной категории
                        // для отображения списка товаров
                        dispatch(SetCategoryPageId( {id, name} ));
                        
                        // Переходим к списку продуктов
                        navigation.navigate("ProductList");
                    }
                }
            />
        </View>
    );
}

export default CategoryItem;