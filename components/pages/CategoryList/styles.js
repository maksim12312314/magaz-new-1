import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    view: {
        justifyContent: "center",
        alignItems: "center",
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        minHeight: Dimensions.get("window").height,
    },
    categorylist: {
        justifyContent: "center",
        alignItems: "center",
    },
    loading: {
        alignSelf: "center",
        justifyContent: "center",
    },
    error: {
        fontSize: 18,
        color: "#fff",
        textAlign: "center",
    },
});

export default styles;