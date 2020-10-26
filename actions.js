import {
    ACTION_TYPE_SET_PRODUCT_LIST,
    ACTION_TYPE_SET_CATEGORY_LIST,
    ACTION_TYPE_CART_SET_PRODUCTS,
    ACTION_TYPE_CART_ADD_PRODUCT,
    ACTION_TYPE_CART_DELETE_PRODUCT,
    ACTION_TYPE_CART_CLEAR,
    ACTION_TYPE_CART_DECREASE_QUANTITY,
    ACTION_TYPE_CART_INCREASE_QUANTITY,
    ACTION_TYPE_CART_CHANGE_QUANTITY,
    ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE,
    ACTION_TYPE_ORDERS_SET_LIST,
    ACTION_TYPE_ORDERS_ADD_TO_LIST,
    ACTION_TYPE_DELIVERY_CHANGE_FIELD,
} from "./types.js"

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

export const ClearCart = () => {
    return {type: ACTION_TYPE_CART_CLEAR};
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

export const SetOrderList = (data) => {
    return {type: ACTION_TYPE_ORDERS_SET_LIST, payload: data};
};

export const AddOrderToList = (data) => {
    return {type: ACTION_TYPE_ORDERS_ADD_TO_LIST, payload: data};
};

export const ChangeDeliveryField = (fieldName, value) => {
    return {type: ACTION_TYPE_DELIVERY_CHANGE_FIELD, fieldName, payload: value};
};