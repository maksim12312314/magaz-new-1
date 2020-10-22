import React from "react";
import { View } from "react-native";
import { STORE_ADDRESS } from "../../../../config";
import OurImage from "../../../OurImage";
import Modal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import OurTextButton from "../../../OurTextButton";
import styles from "./styles";

const OurImageSlider = (props) => {
    const { isModalVisible, toggleModal } = props;

    return (
        <Modal isVisible={isModalVisible}>      
            <ViewPager style={styles.viewPager} initialPage={0}> 
                <View style={styles.modalPicture}>
                    <OurImage 
                        style={styles.modalPicturePallery}
                        disabled={true}
                        url={url} 
                        />  
                </View>
                {
                    data?.galleryImages?.nodes?.map((v, i) =>
                        <View 
                        style={styles.modalPicture}
                        key = {i}>
                            <OurImage
                                url={`${STORE_ADDRESS}wp-content/uploads/${v.mediaDetails?.file}`}
                                style={styles.modal_picture_gallery}
                                disabled={true}
                            />
                        </View>
                )}
            </ViewPager>
                <OurTextButton
                    style={styles.modalButton}
                    textStyle={styles.textButton}
                    onPress={toggleModal}
                >Close</OurTextButton>
        </Modal>
    );
};

export default OurImageSlider;