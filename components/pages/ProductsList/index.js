import React, { useState, useContext, useEffect } from "react";
import { stateContext, dispatchContext } from "../../../contexts";
import { Animated } from "react-native";
import styles from "./styles";
import Header from "./../../Header/index";
import { LinearGradient } from 'expo-linear-gradient';
import ProductsItem from './ProductsItem/index';
import config from "../../../config";

import {
    SetProductsList,
} from "../../../actions";

import { FlatList } from "react-native-gesture-handler";
import {getProductList, getProductListQuery} from "../../../queries";

const address = config.getCell("StoreAddress");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

/**Список товаров той или иной категории */
const ProductsList = (props) =>
{
  // const { navigation } = props;
  
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [error, setError] = useState(false);


    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
      useNativeDriver: true,
    });
    
    // Получаем данные от сервера
    useEffect( () =>
    {
        fetch(`${address}graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: getProductListQuery(state.currentCategory.id),
            })
            .then(res => {return res.json()})
            .then( (res) => 
                {
                    const {data} = res;
                   
                    if ( data.errors )
                        setError(true)
                    else
                        // Устанавливаем полученные данные
                        dispatch(SetProductsList(data, state.currentCategory.id));
                })
            // Иначе показываем ошибку
            .catch(err => {setError(true)})
    }, [state.currentCategory]);

    return (
        <>
            <LinearGradient
                style={styles.productList}
                locations={[0, 1.0]}
                colors={['#2454e5', '#499eda']} />
                <Header {...props} showCart={true}/>
            {
            state.products && state.products[state.currentCategory.id]?.length ?
              <AnimatedFlatList
              scrollEventThrottle={16}
              data={state.products[state.currentCategory.id]}
              renderItem={({item, index}) => {
                return (
                    <ProductsItem index={index} id={item.productId} data={item} y={y} galleryImg={item.galleryImages?.nodes[1]?.mediaDetails?.file}
                    imageUrl={item.image?.mediaDetails?.file} name={item.name}/>
                )
              }
            }
            keyExtractor={item => String(item.productId)}
            {...{ onScroll }} />
              :
              <></>
            }
        </>
    );
};

export default ProductsList;