import React, { useState, useEffect } from "react";
import { Animated, Dimensions, View, TouchableOpacity } from "react-native";
import { stateContext } from "../../../../contexts";
import styles from "./styles";
import OurText from "../../../OurText";
import OurTextButton from "../../../OurTextButton";
import OurImage from "../../../OurImage";
import OurImageSlider from "../../../OurImageSlider";
import { ListAnimation } from "../../../../Animations";
import { STORE_ADDRESS } from "../../../../config";
import { statusToText } from "../index";


const itemWidth = Dimensions.get("window").width;
const itemHeight = 168;
const itemHeight2 = 152;
const totalHeight = 440;

const MAX_IMAGES = 4;



const OrderItem = (props) => {
    const { x, y, index, data } = props;

    const images = Array.from(data.products.values()).map( (v, i) => {
        return `${STORE_ADDRESS}wp-content/uploads/${v.imageLink}`;
    });

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (e) => {
        setModalVisible(!isModalVisible);
    };

    const [gradStart, gradEnd] = ["#931DC4", "#F33BC8"];

    const [translateX, translateY, scale, opacity] = ListAnimation(x, y, totalHeight, itemHeight2, itemWidth, index);

    return (
        <Animated.View style={[styles.mainContainer, {height: itemHeight, width:itemWidth}, { opacity, transform: [{ translateX }, { scale }] }]}>
            <View style={styles.topContainer}>
                <View style={styles.infoContainer}>
                    <OurText style={styles.textField} translate={true}>orderAddress</OurText>
                    <OurText style={styles.text}>{data.deliveryDetails.address}</OurText>
                </View>
                <View style={styles.infoContainerReversed}>
                    <OurText style={styles.textField} translate={true}>orderStatus</OurText>
                    <OurText style={styles.textReversed} translate={true}>{statusToText(data.status)}</OurText>
                </View>
            </View>
            <View style={styles.middleContainer}>
                {
                    images.map( (url, i) => {
                        if ( i > MAX_IMAGES - 1 )
                            return;
                        else
                            return <OurImage style={styles.productImage} onPress={toggleModal} url={url} key={i} />;
                    })
                }
                <OurImageSlider data={images} isModalVisible={isModalVisible} toggleModal={toggleModal} />
            </View>
            <View style={styles.bottomContainer}>
                <OurTextButton style={styles.button} textStyle={{color: gradEnd}} translate={true}>orderCancel</OurTextButton>
                <OurTextButton style={styles.button} textStyle={{color: gradEnd}} translate={true}>orderViewInfo</OurTextButton>
            </View>
            <View style={styles.borderContainer}>
                <View style={styles.itemBorder}/>
            </View>
        </Animated.View>
    );
};

export default React.memo(OrderItem); 