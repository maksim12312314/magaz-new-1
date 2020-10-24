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
} from "./types";
import { Alert, ToastAndroid } from "react-native";
import { DeleteFromCart } from "./actions";
import { addProductToCart, deleteProductFromCart } from "./db_handler";

const showToastMessage = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

const isAllDeliveryDetailsSet = (state) => {
    for ( let key in state.deliveryDetails) {

        if (!state.deliveryDetails[key])
            return false;
    }
    return true;
};

/**
 * Редюсер
 * @param  {object} state - объект state
 * @param  {object} action - объект action
 */
const reducer = (state, action) => {
    /**
     * Проверяет тип действия
     */
    switch (action.type)
    {
        case ACTION_TYPE_SET_FIELD: {
            const newState = {...state};
            newState[action.fieldName] = action.payload;

            return newState;
        }

        case ACTION_TYPE_SET_DELIVERY_DETAILS_FIELD: {
            const newState = {...state};
            newState.deliveryDetails[action.fieldName] = action.payload;

            return newState;
        }

        case ACTION_TYPE_CHANGE_BUTTON_STATUS: {
            const newState = {...state};

            if ( isAllDeliveryDetailsSet(newState) && !action.buttonEnabled )
                action.setButtonEnabled(true);
            else if ( !isAllDeliveryDetailsSet(newState) && action.buttonEnabled )
                action.setButtonEnabled(false);

            return newState;
        }

        /**
         * Устанавливает список продуктов для текущей страницы
         */
        case ACTION_TYPE_SET_PRODUCT_LIST: {
            const newState = {...state};

            newState.products = {...newState.products, [action.id]: action.payload.products.nodes};

            return newState;
        }

        /**
         * Устанавливает список категорий для текущей страницы
         */
        case ACTION_TYPE_SET_CATEGORY_LIST: {
            const newState = {...state};

            newState.categories = action.payload;

            return newState;
        }

        /**
         * Загружает данные корзины из базы данных в state
         */
        case ACTION_TYPE_CART_SET_PRODUCTS: {
            const newState = {...state};
            
            newState.cartItems = action.payload || [];

            return newState;
        }

        /**
         * Заносит товар и его данные в state
         */
        case ACTION_TYPE_CART_ADD_PRODUCT: {
            const t = action.t; // Translate
            const newState = {...state};

            if ( state.cartItems.has(action.payload.productId) ) {
                const item = state.cartItems.get(action.payload.productId);
                item.productQuantity += action.payload.productQuantity;
            } else {
                state.cartItems.set(action.payload.productId, action.payload);
            }

            // Расчитываем итоговую цену
            newState.cartTotalPrice = 0;
            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            }

            
            addProductToCart(action.payload.name,
                action.payload.productId,
                action.payload.imageLink,
                action.payload.productQuantity,
                action.payload.price,
                action.payload.selectedVariants,
                action.payload.stockQuantity);

            showToastMessage(t("productAddedMessage", {product: action.payload.name}));

            return newState;
        }

        /**
         * Удаляет товар из корзины
         */
        case ACTION_TYPE_CART_DELETE_PRODUCT: {
            const newState = {...state};

            
            newState.cartItems.delete(action.payload);

            // Расчитываем итоговую цену
            newState.cartTotalPrice = 0;
            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            }

            deleteProductFromCart(action.payload);
            return newState;
        }

        /**
         * Минусует 1 товар из корзины
         */
        case ACTION_TYPE_CART_DECREASE_QUANTITY: {
            const t = action.t;
            const newState = {...state};

            if ( state.cartItems.has(action.payload) ) {
                const item = state.cartItems.get(action.payload);

                if ( item.productQuantity === 1 ) {
                    Alert.alert(t("cartDeleteTitle"), t("cartDeleteMessage"), [
                        {
                            text: t("cancel"),
                            onPress: () => {/*action.dispatch({type: "plus", payload: action.payload})*/},
                            style: "cancel"
                        },
                        {
                            text: t("ok"),
                            onPress: () => {
                                action.dispatch(DeleteFromCart(action.payload));
                            }
                        }
                    ],
                    {cancelable: false});

                } else {
                    item.productQuantity = Math.clamp(item.productQuantity - 1, 0, item.stockQuantity || 99);

                    // Расчитываем итоговую цену
                    newState.cartTotalPrice = 0;
                    if ( newState.cartItems.size ) {
                        newState.cartItems.forEach( (value) => {
                            newState.cartTotalPrice += value.price * value.productQuantity;
                        });
                    }

                    addProductToCart(item.name, item.productId, item.imageLink, item.productQuantity, item.price, item.selectedVariants, item.stockQuantity);
                }
            }
            else
                return state;

            return newState;
        }

        /**
         * Плюсует 1 товар в корзину
         */
        case ACTION_TYPE_CART_INCREASE_QUANTITY: {
            const newState = {...state};

            if ( newState.cartItems.has(action.payload) ) {
                const item = newState.cartItems.get(action.payload);
                item.productQuantity = Math.clamp(item.productQuantity + 1, 1, item.stockQuantity || 99);

                // Расчитываем итоговую цену
                newState.cartTotalPrice = 0;
                if ( newState.cartItems.size ) {
                    newState.cartItems.forEach( (value) => {
                        newState.cartTotalPrice += value.price * value.productQuantity;
                    });
                }

                addProductToCart(item.name, item.productId, item.imageLink, item.productQuantity, item.price, item.selectedVariants, item.stockQuantity);
            }
            else 
                return state;
            
            return newState;
        }

        /**
         * Расчитывает итог для корзины
         */
        // Не рекомендуется к использованию.
        case ACTION_TYPE_CART_COMPUTE_TOTAL_PRICE: {
            const newState = {...state};
            newState.cartTotalPrice = 0;
            

            if ( newState.cartItems.size ) {
                newState.cartItems.forEach( (value) => {
                    newState.cartTotalPrice += value.price * value.productQuantity;
                });
            } else {
                newState.cartTotalPrice = 0;
                return newState;
            }
            
            return newState;
        }

        default:
            return state;
    }
};

export default reducer;