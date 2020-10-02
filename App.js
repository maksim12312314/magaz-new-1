import React, { useReducer } from "react";
import { stateContext, dispatchContext } from "./contexts";
import { AppRegistry, ToastAndroid, Alert, AsyncStorage } from 'react-native';
import { name as appName } from "./app.json";
import * as hehe from './utils';
import { createDBTables } from "./db_handler";
import reducer from "./reducer";

import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


import CategoryList from "./components/pages/CategoryList/index";
import Cart from "./components/pages/Cart/index";
import Header from "./components/Header/index";
import ProductList from "./components/pages/ProductsList/index";
import DeliveryDetails from './components/Delivery/index';
import Orders from "./components/Orders/index";
import Editor from "./components/Orders/editor";


import "./i18n";
AppRegistry.registerComponent(appName, () => App);

/**
 * Стэк навигация
 */
const NotYoursNavigator = createStackNavigator({
	CategoryList: { 
		screen: CategoryList,
		title: 'Category',
	},
	Cart: {
		screen: Cart,
		title: 'Cart',
	},
	ProductList: {
		screen: ProductList,
		title: 'ProductList',
	},
	DeliveryDetails: {
		screen: DeliveryDetails,
		title: 'DeliveryDetails',
	},
	Editor: {
		screen: Editor,
		title: 'Editor',
	},
	Orders: {
		screen: Orders,
		title: 'Orders',
	},
	
},
{
	initialRouteName : "CategoryList",
	backBehavior: "history",
	mode: 'modal',
	headerMode: 'none',
	defaultNavigationOptions: {
		tabBarVisible: true,
	},
});

/**Контейнер приложения */
const AppContainer = createAppContainer(NotYoursNavigator);

const initialState = {
	cartItems: [],
	cartTotalPrice: 0,
	currentCategory: -1,
	deliveryDetails: {},
};

const App = () =>
{
	const [state, dispatch] = useReducer(reducer, initialState);

	createDBTables();

	// Сюда запихиваем свою страницу
	// после чего можно работать над ней
	return (
		<stateContext.Provider value={state}>
			<dispatchContext.Provider value={dispatch}>
				<AppContainer/>
			</dispatchContext.Provider>
		</stateContext.Provider>
	);
};
export default App;