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
import OurActivityIndicator from "../../OurActivityIndicator";

const address = config.getCell("StoreAddress");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);






/**Список товаров той или иной категории */
const ProductsList = (props) =>
{
    // const { navigation } = props;
  
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [error, setError] = useState(false);

    const {currentCategory} = props.route.params;
    

    console.log(`Rendering ProductsList ${JSON.stringify(state.products[currentCategory.id])}`);

    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });
    

    const renderProductItem = ({item, index})=>{

        return (
            <ProductsItem index={index} id={item.productId} data={item} y={y} galleryImg={item.galleryImages?.nodes[1]?.mediaDetails?.file}
            imageUrl={item.image?.mediaDetails?.file} name={item.name} />
        )
    
    }


    // Получаем данные от сервера
    useEffect( () =>
    {
        console.log(`ProductsList fetching `);
        fetch(`${address}graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: getProductListQuery(currentCategory.id),
            })
            .then(res => {return res.json()})
            .then( (res) => 
                {
                    const {data} = res;

                    if ( data.errors )
                        setError(true)
                    else
                        // Устанавливаем полученные данные
                        dispatch(SetProductsList(data, currentCategory.id));
                })
            // Иначе показываем ошибку
            .catch(err => {setError(true)})
    }, [currentCategory]);

    return (
        <>
            <LinearGradient
                style={styles.productList}
                locations={[0, 1.0]}
                colors={['#2454e5', '#499eda']} />
            {/* <Header {...props} showCart={true}/> */}
            {
            state.products && state.products[currentCategory.id]?.length ?
                <AnimatedFlatList
                    scrollEventThrottle={16}
                    data={state.products[currentCategory.id]}
                    renderItem={ renderProductItem }
                    keyExtractor={item => String(item.productId)}
                    {...{ onScroll }} />
                :
                <OurActivityIndicator error />
            }
        </>
    );
};

export default React.memo(ProductsList);