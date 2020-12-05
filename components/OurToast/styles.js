import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        position: "absolute",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        paddingHorizontal: 10,
    },
});

export default styles;