import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CategoryList from "./components/pages/CategoryList";
import Cart from "./components/pages/Cart";
import ProductList from "./components/pages/ProductsList";
import DeliveryDetails from "./components/Delivery";
import Editor from "./components/Orders/editor";
import Orders from "./components/Orders";


const {Navigator, Screen} = createStackNavigator();


const AppStackNavigator = ()=>{
    return (

        <Navigator
            initialRouteName="CategoryList"
            backBehavior="history"
            mode='modal'
            headerMode='none'
            defaultNavigationOptions={
            {tabBarVisible: true}}
        
        >
            <Screen 
                name="CategoryList"
                component={CategoryList}
            />
            <Screen 
                name="Cart"
                component={Cart}
            />
            <Screen 
                name="ProductList"
                component={ProductList}
            />
            <Screen 
                name="DeliveryDetails"
                component={DeliveryDetails}
            />
            <Screen 
                name="Editor"
                component={Editor}
            />
            <Screen 
                name="Orders"
                component={Orders}
            />


        </Navigator>


    )
}


// /**
//  * Стэк навигация
//  */
// const AppStackNavigator = createStackNavigator({
//         CategoryList: {
//             screen: CategoryList,
//             title: 'Category',
//         },
//         Cart: {
//             screen: Cart,
//             title: 'Cart',
//         },
//         ProductList: {
//             screen: ProductList,
//             title: 'ProductList',
//         },
//         DeliveryDetails: {
//             screen: DeliveryDetails,
//             title: 'DeliveryDetails',
//         },
//         Editor: {
//             screen: Editor,
//             title: 'Editor',
//         },
//         Orders: {
//             screen: Orders,
//             title: 'Orders',
//         },
//     },
//     {
//         initialRouteName : "CategoryList",
//         backBehavior: "history",
//         mode: 'modal',
//         headerMode: 'none',
//         defaultNavigationOptions: {
//             tabBarVisible: true,
//         },
//     },
// );

export default AppStackNavigator;