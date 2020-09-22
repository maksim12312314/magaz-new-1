import { Dimensions, StyleSheet } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
    container: {
        height: 42,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: Constants.statusBarHeight + 12,
        marginBottom: 8,
        minWidth: Dimensions.get("window").width,
    },
    backContainer: {
        width: 40.5,
        height: 49.5,
        marginLeft: 10,
    },
    iconBack: {
        width: 40.5,
        height: 49.5,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    titleContainer: {},
    title: {
        fontSize: 25,
        color: "#fff",
        textAlign: "center",
    },
    cartContainer: {
        width: 49.5,
        height: 40.5,
        marginRight: 15,
    },
    iconCart: {
        width: 49.5,
        height: 40.5,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    badge: {
        width: 28,
        height: 28,
        top: 19,
        left: -15,
        alignItems: "center",
        justifyContent: "center",
    },
    badgeText: {
        color: "#fff",
        textShadowColor: "#000",
        textShadowRadius: 1,
        textShadowOffset: {width: .5, height: .5},
    },
    priceText: {
        color: "#fff",
        textShadowRadius: 1,
        textShadowOffset: {width: 1, height: 1},
    }
});
export default styles;