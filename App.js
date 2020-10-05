
import { enableScreens } from 'react-native-screens';

enableScreens();

import React, { useReducer, useEffect } from "react";
import { stateContext, dispatchContext } from "./contexts";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from "./navigation";
import { name } from "./app.json";
import * as hehe from './utils';
import { createDBTables, getCart } from "./db_handler";
import reducer from "./reducer";
import "./i18n";
import { ComputeTotalPrice, SetCartItems } from "./actions";

/**Контейнер приложения */
const AppContainer = ()=>{
	return (
		<NavigationContainer>
			<AppStackNavigator/>
		</NavigationContainer>
		);
}

const initialState = {
	cartItems: new Map(),
	cartTotalPrice: 0,
	currentCategory: -1,
	deliveryDetails: {},
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect( () => {
		createDBTables();

		/*
        * Подгружаем данные корзины из базы данных
        * */
	// 	getCart((tr, result) => {
	// 		const data = result.rows["_array"] || [];
	// 		dispatch(SetCartItems(data));
	// 		dispatch(ComputeTotalPrice());
	// 	},
	// 	(err) => {
	// 		console.log("WELL SHIT", err)
	// 	});
	}, []);

	return (
		<stateContext.Provider value={state}>
			<dispatchContext.Provider value={dispatch}>
				<AppContainer/>
			</dispatchContext.Provider>
		</stateContext.Provider>
	);
};
AppRegistry.registerComponent(name, () => App);

export default App;