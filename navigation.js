import React from "react";
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import CategoryList from "./components/pages/CategoryList";
import Cart from "./components/pages/Cart";
import ProductList from "./components/pages/ProductsList";
import DeliveryDetails from "./components/Delivery";
import Editor from "./components/Orders/editor";
import Orders from "./components/Orders";

const { Navigator, Screen } = createNativeStackNavigator();

/**
 * Стэк навигация
 */
const AppStackNavigator = () => {
    return (
        <Navigator
            initialRouteName="CategoryList"
            backBehavior="history"
            mode='modal'
            headerMode='screen'
            defaultNavigationOptions={{
                tabBarVisible: true,
                headerHideShadow: true,
            }}>
            <Screen 
                name="CategoryList"
                component={CategoryList}/>
            <Screen 
                name="Cart"
                component={Cart}/>
            <Screen 
                name="ProductList"
                component={ProductList}/>
            <Screen 
                name="DeliveryDetails"
                component={DeliveryDetails}/>
            <Screen 
                name="Editor"
                component={Editor}/>
            <Screen 
                name="Orders"
                component={Orders}/>
        </Navigator>
    );
};

export default AppStackNavigator;