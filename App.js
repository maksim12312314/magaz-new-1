import { enableScreens } from 'react-native-screens';

enableScreens();

import React, { useReducer, useEffect } from "react";
import { AppRegistry } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppStackNavigator from "./navigation";
import { name } from "./app.json";
import * as hehe from './utils';
import { reducer, initialState } from "./reducer";
import { stateContext, dispatchContext } from "./contexts";
import { createDBTables, getCartFromDB, getOrdersFromDB } from "./db_handler";
import { ComputeTotalPrice, SetCartProducts, SetOrderList } from "./actions";
import "./i18n";

/**Контейнер приложения */
const AppContainer = () => {
	return (
		<NavigationContainer>
			<AppStackNavigator/>
		</NavigationContainer>
	);	
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect( () => {
		createDBTables();

		/*
        * Подгружаем данные корзины из базы данных
        * */
		getCartFromDB((tr, result) => {
			const data = new Map();
			result.rows["_array"].map( (v, i) => {
				data.set(v.productId, v);
			});
			dispatch(SetCartProducts(data));
			dispatch(ComputeTotalPrice());
		},
		(err) => {
			console.log("WELL SHIT", err)
		});

		/*
        * Подгружаем данные заказов из базы данных
        * */
		getOrdersFromDB((tr, result) => {
			const data = new Map();
			result.rows["_array"].map( (v, i) => {
				const products = [];
				try {
					products = JSON.parse(v.products);
				} catch { /*fuck)*/ }

				const order = { ...v, products };
				data.set(order.id, order);
			});
			dispatch(SetOrderList(data));
		},
		(err) => {
			console.log("WELL SHIT", err)
		});
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