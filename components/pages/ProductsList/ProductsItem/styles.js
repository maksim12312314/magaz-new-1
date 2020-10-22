import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        paddingVertical: 30,
        marginHorizontal: 5,
        marginBottom: 10,
        backgroundColor: '#0001',
        borderRadius: 6,
    },
    title: {
        fontSize: 26,
        color: "#fff",
        textAlign: "center",
        marginHorizontal: 30,
    },
    picture: {
        width: 110,
        height: 110,
        borderRadius: 36,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#707070",
    },
    right: {
        flex: 1,
        marginRight: 30,
        marginTop: 15,
        marginBottom: 20,
    },
    left: {
        flex: 1,
        marginBottom: 20,
        marginLeft: 0,
        marginHorizontal: 0,
    },
    picture_gallery: {
        width: 60,
        height: 50,
    },
    modal_picture: {
        alignItems: 'center',
        justifyContent: "center",
    },
    modal_picture_gallery: {
        width: 240.5,
        height: 240.5,
        borderRadius: 36,
        borderWidth: 1,
    },
    viewPager: {
        flex:1,
    },
    card: {
        minWidth: Dimensions.get("window").width,
        maxHeight: 400,
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    bottom:
    {
        minWidth: Dimensions.get("window").width,
        maxHeight: 400,
        marginTop: 15,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 16,
        color: "#fff",
        paddingLeft: 18,
    },
    picker: {
        width: 180,
        color: "#fff",
    },
    buyButton: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        marginRight: 18,
        borderRadius: 15,
        textAlign: "center",
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 70,
    },
    textButton: {
        paddingHorizontal: 16,
        color: "#078998",
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
    descriptionText: {
        color: "#ffffff",
        fontScale: 18,
    }
});

export default styles;