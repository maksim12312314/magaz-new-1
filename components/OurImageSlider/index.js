import React, { useEffect } from "react";
import { View } from "react-native";
import { STORE_ADDRESS } from "../../config";
import OurImage from "../OurImage";
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import OurTextButton from "../OurTextButton";
import styles from "./styles";

const OurImageSlider = (props) => {
    const { data, isModalVisible, toggleModal } = props;

    return (
        <Modal onBackdropPress={toggleModal} onBackButtonPress={toggleModal} isVisible={isModalVisible}>      
            <ViewPager style={styles.viewPager} showPageIndicator={true}>
                {
                    data.map((url, i) =>
                        <View 
                        style={styles.modalPicture}
                        key = {i}>
                            <OurImage
                                url={url}
                                style={styles.modalPictureGallery}
                                disabled={true}
                            />
                        </View>
                )}
            </ViewPager>
            <OurTextButton
                style={styles.modalButton}
                onPress={toggleModal}
                translate={true}
            >close</OurTextButton>
        </Modal>
    );
};

export default OurImageSlider;