import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",

        backgroundColor: "#ddde",
        padding: 10,
        marginVertical: 4,

        borderRadius: 2,
        elevation: 2,
    },
    text: {
        fontSize: 16,
    }
});

export default styles;