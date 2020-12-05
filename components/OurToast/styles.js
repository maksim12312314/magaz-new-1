import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column-reverse",
        position: "absolute",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
});

export default styles;