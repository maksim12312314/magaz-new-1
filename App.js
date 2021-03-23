import React, { useState, useEffect } from "react";
import { AppRegistry } from "react-native";
import { enableScreens } from "react-native-screens";
import { expo } from "./app.json";
import AppStarted from "./AppStarted";
import LoadingScreen from "./components/pages/LoadingScreen";

import SyncStorage from "sync-storage";


enableScreens();


const App = () => {
	const [loaded, setLoaded] = useState(false);

	useEffect( () => {
		SyncStorage.init().then(res=> {
			//setTimeout(() => {
				console.log("App init");
				setLoaded(true);
			//}, 2000 * Math.random()); // Ну красиво же
		})
		
	}, []);

	return (
		loaded ?
			<AppStarted/>
		:
			<LoadingScreen />
	);
};

AppRegistry.registerComponent(expo.name, () => App);

export default App;