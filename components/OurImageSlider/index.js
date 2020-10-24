import React, { useEffect } from "react";
import { View } from "react-native";
import { STORE_ADDRESS } from "../../config";
import OurImage from "../OurImage";
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import OurTextButton from "../OurTextButton";
import styles from "./styles";

const OurImageSlider = (props) => {
    const { data, firstImage, isModalVisible, toggleModal } = props;

    useEffect( () => {
        data.unshift({
            mediaDetails: {
                file: firstImage,
                first: true,
            }
        })
    }, []);

    return (
        <Modal onBackdropPress={toggleModal} onBackButtonPress={toggleModal} isVisible={isModalVisible}>      
            <ViewPager style={styles.viewPager} showPageIndicator={true}>
                {
                    data.map((v, i) =>
                        <View 
                        style={styles.modalPicture}
                        key = {i}>
                            <OurImage
                                url={ v.mediaDetails?.first ? v.mediaDetails?.file :`${STORE_ADDRESS}wp-content/uploads/${v.mediaDetails?.file}`}
                                style={styles.modalPictureGallery}
                                disabled={true}
                            />
                        </View>
                )}
            </ViewPager>
            <OurTextButton
                style={styles.modalButton}
                onPress={toggleModal}
            >Close</OurTextButton>
        </Modal>
    );
};

export default OurImageSlider;