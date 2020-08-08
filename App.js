import React, { useReducer } from "react";
import { stateContext, dispatchContext } from "./contexts";
import CategoryList from "./components/pages/CategoryList/index";
import Cart from "./components/pages/Cart/index";
import Header from "./components/Header/index";
import ProductList from "./components/pages/ProductsList/index";
import { AppRegistry, ToastAndroid, Alert, AsyncStorage, Easing, Anumated } from 'react-native';
import { name as appName } from "./app.json";

import { createAppContainer,} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack';

import DeliveryDetails from './components/Delivery/index';
import * as hehe from './utils';
import Orders from "./components/Orders/index";
import Editor from "./components/Orders/editor";

import "./i18n";
import { useTranslation} from "react-i18next";
import {
	SET_CART_ITEMS,
	SET_FIELD,
	SET_DELIVERY_DETAILS_FIELD,
	CHANGE_BUTTON_STATUS,
	SET_CATEGORY_PAGE_ID,
	ADD_TO_CART,
	SET_PRODUCTS_LIST,
	SET_CATEGORIES_LIST,
	COMPUTE_TOTAL_PRICE,
	DELETE_FROM_CART,
	MINUS,
	PLUS,
} from "./types";

import {
	DeleteFromCart,
	ComputeTotalPrice,
} from "./actions";

const showToastMessage = (message) =>
{
    ToastAndroid.show(message, ToastAndroid.SHORT);
};

AppRegistry.registerComponent(appName, () => App);

const isAllDeliveryDetailsSet = (state) =>
{
    for ( key in state.deliveryDetails)
    {
        
        if (!state.deliveryDetails[key])
            return false;
    } 
    return true;
};


/**
 * Редюсер
 * @param  {object} state - объект state
 * @param  {object} action - объект action
 */
const reducer = (state, action) =>
{
	/**
	 * Проверяет тип действия
	 */
	switch (action.type)
	{
		case SET_CART_ITEMS:
		{
			const newState = {...state};
			newState.cartItems = action.cartItems.cart || [];
			
			return newState;
		}

		case SET_FIELD:
		{
			const newState = {...state};
			newState[action.fieldName] = action.payload;

			return newState;
		}


		case SET_DELIVERY_DETAILS_FIELD:
		{
			const newState = {...state};
			newState.deliveryDetails[action.fieldName] = action.payload;

			return newState;
		}
		
		case CHANGE_BUTTON_STATUS:{
			const newState = {...state};
			
			if(isAllDeliveryDetailsSet(newState) && !action.buttonEnabled)
				action.setButtonEnabled(true);
			else if(!isAllDeliveryDetailsSet(newState) && action.buttonEnabled)
				action.setButtonEnabled(false);

			return newState;
		}

		/**
		 * Устанавливает id категории для текущей страницы
		 */
		case SET_CATEGORY_PAGE_ID:
		{
			const newState = {...state};
			newState.currentCategory = action.payload;
			return newState;
		}
		/**
		 * Заносит товар и его данные в state
		 */
		case ADD_TO_CART:
		{
			const t = action.t;
			const newState = {...state};

			/*const containing = newState.cartItems.reduce( (a,e,i,m)=>{

				if (e.id == action.payload.id)
					return i;

			}, newState.cartItems.length )*/ // Говнокод)

			let containing, num;

			for ( let i in newState.cartItems )
			{
				if ( newState.cartItems[i].id === action.payload.id )
				{
					containing = true;
					num = i;
				}
			}

			if ( action.payload )
			{
				if ( !containing )
				{
					newState.cartItems.push(action.payload);
				}
				else
				{
					if ( newState.cartItems[num] )
						newState.cartItems[num].count += action.payload.count;
				}
			}
			
			( async () =>
			{
				AsyncStorage.setItem("cartItems", JSON.stringify({cart:newState.cartItems}));
			})();

			action.dispatch(ComputeTotalPrice());
			showToastMessage(t("productAddedMessage", {product: action.payload.name}));

			return newState;
		}

		/**
		 * Устанавливает список продуктов для текущей страницы
		 */
		case SET_PRODUCTS_LIST:
		{
			const newState = {...state};
			
			newState.products = {...newState.products, [action.id]: action.payload.products.nodes};
			
			return newState;
		}

		/**
		 * Устанавливает список категорий для текущей страницы
		 */
		case SET_CATEGORIES_LIST:
		{
			const newState = {...state};
			
			newState.categories = action.payload.productCategories.nodes;
			
			return newState;
		}

		/**
		 * Расчитывает общую цену для корзины
		 */
		case COMPUTE_TOTAL_PRICE:
		{
			const newState = {...state};
			newState.cartTotalPrice = 0;

			state.cartItems.map( (v) =>
			{
				newState.cartTotalPrice += v.price * v.count;
			});
			return newState;
		}

		/**
		 * Удаляет товар из корзины
		 */
		case DELETE_FROM_CART:
		{
			const newState = {...state};
			
			const itemWithoutDeleted = state.cartItems.filter((v, i) =>
			{
				if ( v.id !== action.payload )
					return true;
			});
			newState.cartItems = itemWithoutDeleted;
			
			( async () =>
			{
				AsyncStorage.setItem("cartItems", JSON.stringify({cart:newState.cartItems}));
			})();
			return newState;
		}

		/**
		 * Минусует 1 товар из корзины
		 */
		case MINUS:
		{
			const t = action.t;
			const newState = {...state};
			const elem = state.cartItems.filter( (v, i) =>
			{
				if ( v.id === action.payload )
					return true;
			});

			if ( elem[0].count === 1 )
			{
				Alert.alert(t("cartDeleteTitle"), t("cartDeleteMessage"), [
					{
						text: t("cancel"),
						onPress: () => {/*action.dispatch({type: "plus", payload: action.payload})*/},
						style: "cancel"
					},
					{
						text: t("ok"),
						onPress: () => {
							action.dispatch(DeleteFromCart(action.payload));
						}
					}
				],
				{cancelable: false});
			}
			else
			{
				elem[0].count = Math.clamp(--elem[0].count, 0, elem[0].stockQuantity || 99);
				newState.cartItems[newState.cartItems.indexOf(elem[0])] = elem[0];
			}

			return newState;
		}
		/**
		 * Плюсует 1 товар в корзину
		 */
		case PLUS:
		{
			const elem = state.cartItems.filter( (v, i) =>
			{
				if ( v.id === action.payload )
					return true;
			});
			const newState = {...state};
			elem[0].count = Math.clamp(++elem[0].count, 1, elem[0].stockQuantity || 99);
			
			newState.cartItems[newState.cartItems.indexOf(elem[0])] = elem[0];
			( async () =>
			{
				AsyncStorage.setItem("cartItems", JSON.stringify({cart:newState.cartItems}));
			})();

			return newState;
		}

		default:
			return state;
	}
};

const initialState = {
	cartItems: [],
	cartTotalPrice: 0,
	currentCategory: -1,
	deliveryDetails: {},
};




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
		tabBarVisible:true,
		
	  },
    
   
    


  } );

/**Контейнер приложения */
const AppContainer = createAppContainer(NotYoursNavigator);

const App = () =>
{
	const [state, dispatch] = useReducer(reducer, initialState);

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