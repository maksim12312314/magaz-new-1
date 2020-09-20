import React, {useContext, useState, useEffect} from "react";
import { Image, View, TouchableOpacity, Dimensions, Animated } from "react-native";
import styles from "./styles";
import config from "../../../../config";
import { stateContext, dispatchContext } from "../../../../contexts";
import PickerModal from 'react-native-picker-modal-view';
import OurText from "../../../OurText";
import PickerButton from "../../../PickerButton";
import {useTranslation} from "react-i18next";
import { addImage, getImage } from "../../../../db_handler";
import ImgToBase64 from "react-native-image-base64";

import {
    AddToCart,
    ComputeTotalPrice,
} from "../../../../actions";
import { clockRunning } from "react-native-reanimated";
const address = config.getCell("StoreAddress");

const totalHeight = Dimensions.get("window").height 
const itemHeight = totalHeight / 2;




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
    const {data, y, index} = props;
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
                fetch(url)
                .then( res =>  res.blob() )
                .then( data => {
                    const base = base64.encode(data);
                    console.log("sxdassd", base)
                    //addImage(url, base);
                    setImage(base);
                });
                ImgToBase64.getBase64String(url)
                .then( base => { console.log(base)})
                console.log(url)
                
            }

        }
        getImage(url, cb, (tr, err) => console.log(`ERROR ${err}`));
        
        
        
    }, []);

    const position = Animated.subtract(index * itemHeight, y);
    const isDisappearing = -itemHeight;
    const isTop = 0;
    const isBottom = totalHeight - itemHeight;
    const isAppearing = totalHeight;
    const translateY = Animated.add(
        Animated.add(
        y,
        y.interpolate({
            inputRange: [0, 0.00001 + index * itemHeight],
            outputRange: [0, -index * itemHeight],
            extrapolateRight: "clamp",
        })
        ),
        position.interpolate({
        inputRange: [isBottom, isAppearing],
        outputRange: [0, -itemHeight / 4],
        extrapolate: "clamp",
        })
    );
    const scale = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
        extrapolate: "clamp",
    });
    const opacity = position.interpolate({
        inputRange: [isDisappearing, isTop, isBottom, isAppearing],
        outputRange: [0.5, 1, 1, 0.5],
    });


    return (
        <Animated.View style={[styles.container, {height: itemHeight}, { opacity, transform: [{ translateY }, { scale }] }]}>

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
        </Animated.View>
            

    );
};

export default ProductsItem;