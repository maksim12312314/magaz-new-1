import React, { useReducer } from "react";
import { stateContext, dispatchContext } from "./contexts";
import { AppRegistry } from 'react-native';
import { createAppContainer } from "react-navigation";
import AppStackNavigator from "./navigation";
import { name } from "./app.json";
import * as hehe from './utils';
import { createDBTables } from "./db_handler";
import reducer from "./reducer";
import "./i18n";

/**Контейнер приложения */
const AppContainer = createAppContainer(AppStackNavigator);

const initialState = {
	cartItems: [],
	cartTotalPrice: 0,
	currentCategory: -1,
	deliveryDetails: {},
};

const App = () => {
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
AppRegistry.registerComponent(name, () => App);

export default App;