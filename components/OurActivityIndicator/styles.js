import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
    },
    indicator: {
        alignSelf: "center",
        justifyContent: "center",
    },
    text: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
    },
    abortText: {
        color: "#fff",
        fontSize: 24,
        textAlign: "center",
        marginBottom: 12,
    }
});

export default styles;