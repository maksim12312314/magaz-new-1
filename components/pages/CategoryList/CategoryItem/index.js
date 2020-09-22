import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { dispatchContext, stateContext } from "../../../../contexts";
import OurText from "../../../OurText";
import { addImage, getImage } from "../../../../db_handler";
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
    const [image, setImage] = useState();
    const dispatch = useContext(dispatchContext);
    const url = imageUrl ? `${address}wp-content/uploads/` + imageUrl
    :  `${address}wp-content/uploads/woocommerce-placeholder.png`;

    const cb = ( tr, result )=> {
        if ( !result.rows.length ) {
            fetch(url)
            .then( res =>  res.blob() )
            .then( data => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    setImage(reader.result);
                    addImage(url, reader.result);
                }
            });
        } else {
            setImage(url, result.rows[0]);
        }

    }
    getImage(url, cb, (tr, err) => console.log(`ERROR ${err}`));

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
                    source={{uri: image}}
                />
                <View style={styles.textView}><OurText style={styles.title}>{name}</OurText></View>
            </TouchableOpacity>
        </View>
    );
}

export default CategoryItem;