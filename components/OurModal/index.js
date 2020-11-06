import React, { useContext } from "react";
import { View } from "react-native";
import Modal from 'react-native-modal';
import OurText from "../OurText";
import OurTextButton from "../OurTextButton";
import { stateContext, dispatchContext } from "../../contexts";
import { CloseModal } from "../../actions";
import styles from "./styles";


const OurModal = (props) => {
    const state = useContext(stateContext);
    const modal = state.modal;
    const dispatch = useContext(dispatchContext);
    const defaultButtons = [
        {
            text: "ok",
        }
    ];

    return (
        <Modal {...props} isVisible={modal.visible} animationIn={modal.animationIn} animationOut={modal.animationOut} backdropTransitionOutTiming={0}>
            <View style={styles.mainContainer}>
                <View style={styles.topContainer}>
                    <OurText style={styles.title} translate={true} params={modal.title.params}>{modal.title.text}</OurText>
                </View>
                <View style={styles.middleContainer}>
                    <OurText style={styles.text} translate={true} params={modal.text.params}>{modal.text.text}</OurText>
                </View>
                <View style={styles.bottomContainer}>
                    {
                        modal.buttons.length === 0 ?
                            defaultButtons.map( (button, index) => {
                                return <OurTextButton style={[styles.button, button.style]}
                                                      textStyle={[styles.buttonText, button.textStyle]}
                                                      onPress={(e) => {
                                                        if ( button.onPress )
                                                            button.onPress(e);

                                                        dispatch(CloseModal());
                                                      }}
                                                      translate={true}
                                                      params={button.params}
                                                      key={index}>{button.text}</OurTextButton>;
                            } )
                        :
                            modal.buttons.map( (button, index) => {
                                return <OurTextButton style={[styles.button, button.style]}
                                                      textStyle={[styles.buttonText, button.textStyle]}
                                                      onPress={(e) => {
                                                        if ( button.onPress )
                                                            button.onPress(e);

                                                        dispatch(CloseModal());
                                                      }}
                                                      translate={true}
                                                      params={button.params}
                                                      key={index}>{button.text}</OurTextButton>;
                            } )
                    }
                </View>
            </View>
        </Modal>
    );
};

export default React.memo(OurModal);