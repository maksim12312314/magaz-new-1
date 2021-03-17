import React, { useReducer, useEffect } from "react";
import { AppRegistry } from "react-native";
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from "@react-navigation/native";
import { enableScreens } from "react-native-screens";
import { expo } from "./app.json";
import { reducer, initialState } from "./reducer";
import { ShowModal } from "./actions";
import { stateContext, dispatchContext } from "./contexts";
import { createDBTables } from "./db_handler";
import AppStackNavigator from "./navigation";
import OurModal from "./components/OurModal";
import OurToast from "~/components/OurToast";
import client from "./apollo";
import "react-native-get-random-values";
import "./i18n";
import "./utils";

enableScreens();

/** Контейнер приложения **/
const AppContainer = () => {
	return (
		<>
			<NavigationContainer>
				<AppStackNavigator/>
			</NavigationContainer>
			<OurModal/>
			<OurToast/>
		</>
	);	
}

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect( () => {
		createDBTables();
		
	}, []);

	return (
		<stateContext.Provider value={state}>
			<dispatchContext.Provider value={dispatch}>
				<ApolloProvider client={client}>
					<AppContainer/>
				</ApolloProvider>
			</dispatchContext.Provider>
		</stateContext.Provider>
	);
};
AppRegistry.registerComponent(expo.name, () => App);

export default App;