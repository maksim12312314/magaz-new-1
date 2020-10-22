import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "column",
        marginHorizontal: 8,
        marginBottom: 12,

        borderWidth: 1,
        borderColor: "#f00",
    },

    titleContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,

        borderWidth: 1,
        borderColor: "#ff0",
    },
    title: {
        color: "#fff",
        fontSize: 26,
        textAlign: "center",
    },

    infoContainer: {

        borderWidth: 1,
        borderColor: "#0f0",
    },
    infoTopContainer: {

        borderWidth: 1,
        borderColor: "#0ff",
    },
    infoPrice: {
        width: 110,
        color: "#fff",
        fontSize: 16,
        textAlign: "center",
    },
    infoBottomContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buyButton: {
        paddingHorizontal: 80,
    },
    buyButtonText: {
        color: "#078998",
    },
    descriptionContainer: {
        paddingHorizontal: 8,
        maxHeight: 120,
        overflow: "hidden",
    },
    descriptionText: {
        color: "#ffffff",
        fontSize: 18,
    }
});

export default styles;
