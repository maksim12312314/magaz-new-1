import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    viewPager: {
        flex:1,
    },
    pictureGallery: {
        width: 60,
        height: 50,
    },
    modalPicture: {
        alignItems: 'center',
        justifyContent: "center",
    },
    modalPictureGallery: {
        width: 240.5,
        height: 240.5,
        borderRadius: 36,
        borderWidth: 1,
    },
    modalButton: {
        color: "#078998",
        textAlign: "center",
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 5,
        borderRadius: 15,
        marginHorizontal: 70,
        backgroundColor: '#ffffff',
    },
});

export default styles;
