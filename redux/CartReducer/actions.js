import client from "~/apollo";
import { QUERY_GET_CART } from "~/apollo/queries";
import { AddToast } from "../ToastReducer/actions";
import { CART_SET_LOADING, CART_SET_PRODUCT_LIST } from "./types";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";

export const SetCartProductList = (productList=[], total=0) => {
    return { type: CART_SET_PRODUCT_LIST, productList, total };
};

export const FetchCartProductList = async (dispatch) => {
    dispatch(SetCartLoading(true));

    let cartData;
    try {
        cartData = await client.query({ query: QUERY_GET_CART, options: { fetchPolicy: "no-cache" } });

        dispatch(SetCartProductList(cartData?.data?.cart?.contents?.nodes, cartData?.data?.cart?.total));
        dispatch(SetCartLoading(false));
    } catch {
        const toast = {
            icon: faShoppingBasket,
            text: t("activityError"),
            duration: 3000,
            color: "#499eda",
        };
        dispatch(AddToast(toast, "CART_FETCH_ERROR"));
    }
};

export const SetCartLoading = (loading=false) => {
    return { type: CART_SET_LOADING, loading };
}