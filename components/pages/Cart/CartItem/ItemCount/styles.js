import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    button: {
        margin: 1,
        width: Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05,
        height: Math.max(Dimensions.get("window").width, Dimensions.get("window").height) * .05,
    },
    itemControl: {
        flexDirection: "row",
    },
});

export default styles;