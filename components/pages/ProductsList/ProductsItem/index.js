import React, { useContext, useState } from "react";
import { View, TouchableOpacity, Dimensions, Animated } from "react-native";
import styles from "./styles";
import { STORE_ADDRESS } from "../../../../config";
import { dispatchContext } from "../../../../contexts";
import PickerModal from 'react-native-picker-modal-view';
import OurText from "../../../OurText";
import OurImage from "../../../OurImage";
import PickerButton from "../../../PickerButton";
import { useTranslation } from "react-i18next";
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import { AddToCart } from "../../../../actions";
import OurTextButton from "../../../OurTextButton";
import { ListAnimation } from "../../../../Animations";

const totalHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;
const itemHeight = totalHeight / 2;

const AttrPicker = (props) =>
{
    const {data, onValueChange} = props;
    const items = data.options.map( (v, i) => { return {Name: v, Value: v, Id: i} });
    const [selected, setSelected] = useState(items[0]);

    return (
        <>
            <OurText style={{color:  "#FFF", fontWeight: "bold", marginTop: 15,}}>{data.name}</OurText>

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
    const {data, x, y, index, name, galleryImg, imageUrl} = props;
    const dispatch = useContext(dispatchContext);
    const itemAttributes = data?.attributes?.nodes || [];
    const {t} = useTranslation();
    const url = data?.image?.mediaDetails?.file ? `${STORE_ADDRESS}wp-content/uploads/${data?.image?.mediaDetails?.file}` : null;

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Обрабатываем нажатие на кнопку "Купить"
    const buyProduct = (e, data) => {
        
        const count = 1;
        const price = data.price ? data.price.match(/\d{1,5}.*\d*/)[0] : 0;
        const itemsTotalPrice = count * price;
        
        // Заносим данные
        let payload = {
            productId: data.productId,
            name: data.name,
            count: count,
            price: price,
            itemsTotalPrice: count * price,
            stockQuantity: data.stockQuantity || 99,
            selectedVariants: [
                "variantID",
            ],
            imageLink: data.image?.mediaDetails?.file,
        };
        // Добавляем в корзину
        dispatch(AddToCart(payload, dispatch, t));
    };

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight, itemWidth, index);

    return (
        <Animated.View style={[styles.container, {height: itemHeight}, { opacity, transform: [{ translateX }, { scale }] }]}>

            <OurText style={styles.title}>{name}</OurText>
            <View style={styles.card}>
                <View style={styles.left}>
                    <OurImage onPress={toggleModal} url={url} />
                        <Modal isVisible={isModalVisible}>      
                            <ViewPager style={styles.viewPager} initialPage={0}> 
<<<<<<< HEAD
                                <View style={styles.modal_picture}>
                                    <OurImage 
                                        style={styles.modal_picture_gallery}
                                        disabled={true}
                                        url={url} 
                                        />
                                </View>
                            {
                            data?.galleryImages?.nodes?.map((v, i)=>
                            <View style={styles.modal_picture}>
                                <OurImage
                                    url={`${STORE_ADDRESS}wp-content/uploads/${v.mediaDetails?.file}`}
                                    style={styles.modal_picture_gallery}
                                    disabled={true}
                                />
                            </View>
                                )}
=======
                                <OurImage
                                    onPress={toggleModal}
                                    url={url} 
                                    style={styles.modal_picture_gallery}
                                    disabled={true}
                                    />
                                    {
                                    data?.galleryImages?.nodes?.map((v, i)=>
                                    <View style={styles.modal_picture}>
                                        <OurImage
                                            url={`${STORE_ADDRESS}wp-content/uploads/${v.mediaDetails?.file}`}
                                            style={styles.modal_picture_gallery}
                                            disabled={true}
                                        />
                                    </View>
                                        )}
>>>>>>> pBinarySoul-master
                            </ViewPager>
                                <OurTextButton
                                    style={styles.modalButton}
                                    textStyle={styles.textButton}
                                    onPress={toggleModal}
                                >Close</OurTextButton>
                        </Modal>
                </View>
                        <View style={styles.right}>
                            <AttrPickersParent data={itemAttributes}/>
                         </View>
            </View>
            <View style={styles.left_bottom}>
                {
                    data?.galleryImages?.nodes?.map((v, i)=>
                        <View style={styles.picture_gallery}>
                            <OurImage
                            style={styles.picture_bottom}
                            url={`${STORE_ADDRESS}wp-content/uploads/${v.mediaDetails?.file}`}
                            onPress={toggleModal}
                            />
                        </View>
                    )}
            </View>
            <View style={styles.bottom}>
                <OurText style={styles.price} params={{
                    price: ( data.price === 0 || !data.price ) ? t("productFree") : data.price
                }}>productPrice</OurText>
                <OurTextButton
                    style={styles.button}
                    textStyle={styles.textButton}
                    translate={true}
                    onPress={(e) => buyProduct(e, data)}
                >productBuy</OurTextButton>
            </View>
            <View>
                <OurText style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</OurText>
            </View>
        </Animated.View>
            

    );
};

export default React.memo(ProductsItem);