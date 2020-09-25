import { StyleSheet, Dimensions } from "react-native";

// CART PAGE STYLES

const styles = StyleSheet.create({
    cartList: {
        flexDirection: "column",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: Dimensions.get("window").height,
    },
    items: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: Dimensions.get("window").width,
    },
    button_enabled: {
        width: Dimensions.get("window").width - 16,
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 14,
        backgroundColor: '#FFF',
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 8,
        marginBottom: 30,
    },
    button_disabled: {
        width: Dimensions.get("window").width - 16,
        paddingHorizontal: 32,
        paddingVertical: 8,
        borderRadius: 14,
        backgroundColor: '#FFFA',
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 8,
        marginBottom: 30,
    },
    text_button: {
        color: "#E4724F",
        fontSize: 16,
        textAlign: "center",
    },
});

export default styles;