import { CART_SET_PRODUCT_LIST } from "./types";

export const initialCartState = {
    productList: new Map(), // Список товаров
    total: 0, // Итоговая цена
};

const cartReducer = ( state = initialCartState, action ) => {
    switch (action.type) {

        /*
         * Устанавливает список товаров в корзине
         */
        case CART_SET_PRODUCT_LIST: {
            const newState = {...state};
            const { productList } = action;

            newState.productList = productList;

            return newState;
        }

        default: {
            return state;
        }
    }
};

export default cartReducer;