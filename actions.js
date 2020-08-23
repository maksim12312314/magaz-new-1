import {
    SET_CART_ITEMS,
    SET_FIELD,
    SET_DELIVERY_DETAILS_FIELD,
    CHANGE_BUTTON_STATUS,
    SET_CATEGORY_PAGE_ID,
    ADD_TO_CART,
    SET_PRODUCTS_LIST,
    SET_CATEGORIES_LIST,
    COMPUTE_TOTAL_PRICE,
    DELETE_FROM_CART,
    MINUS,
    PLUS,
} from "./types.js"

export const SetCartItems = (cartItems) => {
    return {type: SET_CART_ITEMS, payload: cartItems};
};

export const SetField = (fieldName, value) => {
    return {type: SET_FIELD, payload: value, fieldName};
};

export const SetDeliveryDetailsField = (fieldName, value) => {
    return {type: SET_DELIVERY_DETAILS_FIELD, payload: value, fieldName};
};

export const ChangeButtonStatus = (buttonEnabled) => {
    return {type: CHANGE_BUTTON_STATUS, buttonEnabled};
};

export const SetCategoryPageId = (id) => {
    return {type: SET_CATEGORY_PAGE_ID, payload: id};
};

export const AddToCart = (product, dispatch, t) => {
    return {type: ADD_TO_CART, payload: product, dispatch, t};
};

export const SetProductsList = (products, id) => {
    return {type: SET_PRODUCTS_LIST, payload: products, id};
};

export const SetCategoriesList = (categories) => {
    return {type: SET_CATEGORIES_LIST, payload: categories};
};

export const ComputeTotalPrice = () => {
    return {type: COMPUTE_TOTAL_PRICE};
};

export const DeleteFromCart = (id, showAlert) => {
    return {type: DELETE_FROM_CART, payload: id, showAlert};
};

export const Minus = (id, dispatch, t) => {
    return {type: MINUS, payload: id, dispatch, t};
};

export const Plus = (id) => {
    return {type: PLUS, payload: id};
};

