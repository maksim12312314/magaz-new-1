import React, { useContext, useState } from "react";
import { View, ActivityIndicator, Dimensions, Animated } from "react-native";
import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from "react-i18next";
import { STORE_ADDRESS } from "~/config";
import { dispatchContext, stateContext } from "~/contexts";
import { AddProductToCart, AddToast } from "~/actions";
import { ListAnimation } from "~/Animations";
import OurText from "~/components/OurText";
import OurImage from "~/components/OurImage";
import OurTextButton from "~/components/OurTextButton";
import GalleryImg from "~/components/Gallery";
import OurPicker from "~/components/OurPicker";
import OurImageSlider from "~/components/OurImageSlider";
import OurActivityIndicator from "~/components/OurActivityIndicator";
import styles from "./styles";
import { MUTATION_ADD_TO_CART } from "~/queries";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";


const totalHeight = Dimensions.get("window").height;
const itemWidth = Dimensions.get("window").width;
const itemHeight = totalHeight / 2;
const itemHeight2 = itemHeight + 16;


/** Список товаров той или иной категории */
const ProductsItem = (props) => {
    const { data, y, index, name, imageUrl } = props;
    const {t} = useTranslation();
    const [isModalVisible, setModalVisible] = useState(false);

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const onError = (err) => {
        const toast = {
            icon: faShoppingBasket,
            text: t("activityError"),
            duration: 3000,
            color: "#499eda",
        };
        dispatch(AddToast(toast, data.databaseId));
        console.log("Something went wrong",err)
    };
    const onCompleted = (d) => {
        const productQuantity = 1;
        const price = data.price ? data.price.match(/([0-9]*)\.?([0-9]?)/)[0] : 0;
        console.log("BOUGHT DATA", d)
        // Заносим данные
        let payload = {
            productId: data.databaseId,
            name: data.name,
            productQuantity: productQuantity,
            price: price,
            stockQuantity: data.stockQuantity || 99,
            selectedVariants: [
                "variantID",
            ],
            imageLink: data.image?.mediaDetails?.file,
        };
        // Добавляем в корзину
        dispatch(AddProductToCart(payload, dispatch, t));
    }
    const [addToCart, {loading, error}] = useMutation(MUTATION_ADD_TO_CART, {onError, onCompleted});

    const itemAttributes = data?.attributes?.nodes || [];
    const url = data?.image?.mediaDetails?.file ? `${STORE_ADDRESS}wp-content/uploads/${data?.image?.mediaDetails?.file}` : null;
    const images = [url, ...(data?.galleryImages?.nodes.map((obj) => {
        return `${STORE_ADDRESS}wp-content/uploads/${obj?.mediaDetails?.file}`
    }))];

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    // Обрабатываем нажатие на кнопку "Купить"
    const buyProduct = (e, data) => {
        const productQuantity = 1;
        addToCart({
            variables: {
                productId: data.databaseId,
                quantity: productQuantity,
                clientMutationId: state.user.uuid,
            }
        });
        // getCart();
    };

    const [translate, scale, opacity] = ListAnimation(y, totalHeight, itemHeight2, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight}, { opacity, transform: [{ translateX: translate }, { scale }] }]}>
            <View style={styles.titleContainer}>
                <OurText style={styles.title}>{name}</OurText>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.infoTopContainer}>
                    <OurImage url={url}
                              onPress={toggleModal} />
                    <View style={styles.attributesContainer}>
                        {
                            itemAttributes.length !== 0 ?
                                itemAttributes.map( (attr, i) => {
                                    return <OurPicker data={attr} key={i}/>
                                })
                            :
                                <></>
                        }
                    </View>
                    <OurImageSlider data={images} isModalVisible={isModalVisible} toggleModal={toggleModal} />
                </View>
                <View style={styles.infoMiddleContainer}>
                    <GalleryImg data={data?.galleryImages?.nodes}/>
                </View>
                <View style={styles.infoBottomContainer}>
                    <OurText style={styles.infoPrice}
                             params={{
                                 price: ( data.price === 0 || !data.price ) ? t("productFree") : data.price
                             }}>productPrice</OurText>
                    <View style={styles.buy} >
                    {
                        !loading ?
                            <OurTextButton style={styles.buyButton}
                                        textStyle={styles.buyButtonText}
                                        translate={true}
                                        onPress={(e) => buyProduct(e, data)}
                            >productBuy</OurTextButton>
                        :
                        <ActivityIndicator size={48} color={"#fff"}/>
                    }
                    </View>
                </View>
            </View>
            <View style={styles.descriptionContainer}>
                <OurText style={styles.descriptionText}>{data.description?.replace(/<\/*.+?\/*>/gi, "") || ""}</OurText>
            </View>
        </Animated.View>
    );
};

export default React.memo(ProductsItem);
