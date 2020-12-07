import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        overflow: "hidden",

        backgroundColor: "#fffe",
        paddingLeft: 28,
        paddingRight: 48,
        paddingVertical: 10,
        marginVertical: 4,

        borderRadius: 32,
        elevation: 2,
    },
    iconContainer: {
        paddingRight: 14,
    },
    text: {
        fontSize: 16,
    }
});

export default styles;