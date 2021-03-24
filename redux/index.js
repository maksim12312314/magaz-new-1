import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";

import cartReducer from "./CartReducer";
import modalReducer from "./ModalReducer";
import toastReducer from "./ToastReducer";
import ordersReducer from "./OrdersReducer";
import deliveryDetailsReducer from "./DeliveryDetailsReducer";

const reducer = combineReducers({
    cartReducer,
    modalReducer,
    toastReducer,
    ordersReducer,
    deliveryDetailsReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;