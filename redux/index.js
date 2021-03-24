import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import cartReducer from "./CartReducer";
import modalReducer from "./ModalReducer";
import toastReducer from "./ToastReducer";
import deliveryDetailsReducer from "./DeliveryDetailsReducer";
import ordersReducer from "./OrdersReducer";

const reducer = combineReducers({
    cartReducer,
    modalReducer,
    toastReducer,
    deliveryDetailsReducer,
    ordersReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;