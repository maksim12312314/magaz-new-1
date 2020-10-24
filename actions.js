import {
    ACTION_TYPE_SET_FIELD,
    ACTION_TYPE_SET_DELIVERY_DETAILS_FIELD,
    ACTION_TYPE_CHANGE_BUTTON_STATUS,
    ACTION_TYPE_SET_PRODUCT_LIST,
    ACTION_TYPE_SET_CATEGORY_LIST,
    ACTION_TYPE_CART_SET_PRODUCTS,
    ACTION_TYPE_CART_ADD_PRODUCT,
    ACTION_TYPE_CART_DELETE_PRODUCT,
    ACTION_TYPE_CART_DECREASE_QUANTITY,
    ACTION_TYPE_CART_INCREASE_QUANTITY,
    ACTION_TYPE_CART_CHANGE_QUANTITY,
    ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE,
} from "./types.js"

export const SetField = (fieldName, value) => {
    return {type: ACTION_TYPE_SET_FIELD, payload: value, fieldName};
};

export const SetDeliveryDetailsField = (fieldName, value) => {
    return {type: ACTION_TYPE_SET_DELIVERY_DETAILS_FIELD, payload: value, fieldName: fieldName};
};

export const ChangeButtonStatus = (buttonEnabled, setButtonEnabled) => {
    return {type: ACTION_TYPE_CHANGE_BUTTON_STATUS, buttonEnabled, setButtonEnabled};
};

export const SetProductList = (products, id) => {
    return {type: ACTION_TYPE_SET_PRODUCT_LIST, payload: products, id};
};

export const SetCategoryList = (categories) => {
    return {type: ACTION_TYPE_SET_CATEGORY_LIST, payload: categories};
};

export const SetCartProducts = (cartItems) => {
    return {type: ACTION_TYPE_CART_SET_PRODUCTS, payload: cartItems};
};

export const AddProductToCart = (product, dispatch, t) => {
    return {type: ACTION_TYPE_CART_ADD_PRODUCT, payload: product, dispatch, t};
};

export const DeleteProductFromCart = (id, showAlert) => {
    return {type: ACTION_TYPE_CART_DELETE_PRODUCT, payload: id, showAlert};
};

export const DecreaseProductQuantity = (id, dispatch, t) => {
    return {type: ACTION_TYPE_CART_DECREASE_QUANTITY, payload: id, dispatch, t};
};

export const IncreaseProductQuantity = (id) => {
    return {type: ACTION_TYPE_CART_INCREASE_QUANTITY, payload: id};
};

export const ChangeProductQuantity = (id, quantity, dispatch, t) => {
    return {type: ACTION_TYPE_CART_CHANGE_QUANTITY, payload: id, quantity, dispatch, t};
};

export const ComputeTotalPrice = () => {
    return {type: ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE};
};
