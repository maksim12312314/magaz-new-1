import { StyleSheet, Dimensions } from "react-native";

// CART PAGE STYLES

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        maxHeight: Dimensions.get("window").height,
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
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemsBlock: {
        flexDirection: "column",
    },
    button_enabled: {
        paddingHorizontal: 18,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#ffffff',
        left: 0,
        right: 0,
        bottom: 0,
        marginTop: 8,
        marginBottom: 30,
    },
    button_disabled: {
        paddingHorizontal: 18,
        paddingVertical: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#FFFA',
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: 30,
    },
    text_button: {
        color: "#E4724F",
    },
});

export default styles;