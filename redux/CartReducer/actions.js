import { CART_SET_PRODUCT_LIST } from "./types";

export const SetCartProductList = (productList=[]) => {
    return { type: CART_SET_PRODUCT_LIST, productList };
};

export const FetchCartProductList = async (dispatch) => {
    // TODO
};