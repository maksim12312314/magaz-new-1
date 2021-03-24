import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import cartReducer from "./CartReducer";
import modalReducer from "./ModalReducer";
import toastReducer from "./ToastReducer";
import ordersReducer from "./OrdersReducer";
import deliveryDetailsReducer from "./DeliveryDetailsReducer";

console.log("REDUCERS", 
    cartReducer,
    modalReducer,
    toastReducer,
    ordersReducer,
    deliveryDetailsReducer)

const reducer = combineReducers({
    cartReducer,
    modalReducer,
    toastReducer,
    ordersReducer,
    deliveryDetailsReducer,
});
console.log("REDUCERS COMBINED")

const store = createStore(reducer, applyMiddleware(thunk));

export default store;