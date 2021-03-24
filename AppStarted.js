import React from "react";
import { ApolloProvider } from '@apollo/client';

import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reducer, initialState } from "./reducer";

import AppStackNavigator from "./navigation";
import OurModal from "./components/OurModal";
import OurToast from "~/components/OurToast";
import client from "./apollo";

import "react-native-get-random-values";
import "./i18n";
import "./utils";

enableScreens();

const store = createStore(reducer, initialState, applyMiddleware(thunk));

/** Контейнер приложения **/
const AppContainer = () => {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<AppStackNavigator/>
			</NavigationContainer>
			<OurModal/>
			<OurToast/>
		</Provider>
	);	
}

const AppStarted = () => {

	return (
		<ApolloProvider client={client}>
			<AppContainer/>
		</ApolloProvider>
	);
};


export default AppStarted;