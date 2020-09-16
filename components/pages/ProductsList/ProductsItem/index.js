import React, {useContext, useState, useEffect} from "react";
import { Image, View, TouchableOpacity, AsyncStorage } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { stateContext, dispatchContext } from "../../../../contexts";
import PickerModal from 'react-native-picker-modal-view';
import OurText from "../../../OurText";
import PickerButton from "../../../PickerButton";
import {useTranslation} from "react-i18next";
import { addImage, getImage } from "../../../../db_handler";
import base64 from 'react-native-base64'

import {
    AddToCart,
    ComputeTotalPrice,
} from "../../../../actions";
const address = config.getCell("StoreAddress");

const AttrPicker = (props) =>
{
    const {data, onValueChange} = props;
    const items = data.options.map( (v, i) => { return {Name: v, Value: v, Id: i} });
    const [selected, setSelected] = useState(items[0]);

    return (
        <>
            <OurText style={{color:  "#FFF", fontWeight: "bold"}}>{data.name}</OurText>

            <PickerModal
                renderSelectView={(disabled, sel, showModal) =>
                    <PickerButton
                        disabled={disabled}
                        onPress={showModal}>{selected.Name || ""}</PickerButton>
                }
                onSelected={(val) => {
                    if ( val && Object.keys(val).length !== 0 ) {
                        setSelected(val);

                        if (onValueChange)
                            onValueChange(val);
                    }
                }}
                items={items}
                showToTopButton={true}
                selected={selected}
                backButtonDisabled={true}
                showAlphabeticalIndex={true}
                autoGenerateAlphabeticalIndex={true}
                requireSelection={false}
                autoSort={false}
            />
        </>
    )
};

const AttrPickersParent = (props) =>
{
    const {data} = props;
    return (
        <>
            {data.map( (v, i) =>
            {
                return <AttrPicker data={v} key={i}/>
            })}
        </>
    )
};

/** Список товаров той или иной категории */
const ProductsItem = (props) =>
{
    const {data} = props;
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [image, setImage] = useState();
    const [selected, setSelected] = useState({});
    const itemAttributes = data?.attributes?.nodes || [];
    const {t} = useTranslation();
    
    useEffect( () => {
        const url = data?.image?.mediaDetails?.file ? `${address}wp-content/uploads/` + data.image.mediaDetails.file
        :  `${address}wp-content/uploads/woocommerce-placeholder.png`


        

        const cb = ( tr, result )=> {
            console.log("asdas",result)
            if ( !result.rows.length ) {
                fetch(url, {method: "GET"})
                .then( res => {
                    const bs = base64.encode(res.text());
                    console.log("sxdassd", bs)
                    addImage(url, bs);
                    setImage(bs)
                } )
            }

        }
        let image = getImage(url, cb, (tr, err) => console.log(`ERROR ${err}`));
        
        
        
    }, []);

    return (
        <View style={styles.container}>

            <OurText style={styles.title}>{data.name}</OurText>
            <View style={styles.card}>
                <View style={styles.left}>
                    <Image
                        style={styles.picture}
                        source={{uri: image}}
                    />
                </View>
                    <View style={styles.right}>
                        <AttrPickersParent data={itemAttributes}/>
                    </View>
            </View>
                <View style={styles.bottom}>
                    <OurText style={styles.price} params={{
                        price: ( data.price === 0 || !data.price ) ? t("productFree") : data.price
                    }}>productPrice</OurText>
                        <TouchableOpacity style={styles.button} onPress={ (e) =>
                        {
                            // Обрабатываем нажатие на кнопку "Купить"

                            // Заносим данные
                            let payload = {
                                id: data.productId,
                                name: data.name,
                                count: 1,
                                price: data.price ? data.price.match(/\d{1,5}.*\d*/)[0] : 0,
                                stockQuantity: data.stockQuantity || 99,
                                selectedVariants: [
                                    "variantID"
                                ]
                            };
                            // Добавляем в корзину
                            dispatch(AddToCart(payload, dispatch, t));
                            dispatch(ComputeTotalPrice());
                        }}>
                            <OurText style={styles.text_button} translate={true}>productBuy</OurText>
                        </TouchableOpacity>
                </View>
                    <View>
                        <OurText style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</OurText>
                    </View>
        </View>
            

    );
};

export default ProductsItem;