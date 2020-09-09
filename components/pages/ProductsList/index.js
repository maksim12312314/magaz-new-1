import React, { useState, useContext, useEffect } from "react";
import { stateContext, dispatchContext } from "../../../contexts";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import styles from "./styles";
import Header from "./../../Header/index";
import { LinearGradient } from 'expo-linear-gradient';
import ProductsItem from './ProductsItem/index';
import config from "../../../config";
import OurText from "../../OurText";

import {
    SetProductsList,
} from "../../../actions";

import { FlatList } from "react-native-gesture-handler";

const address = config.getCell("StoreAddress");

/**Список товаров той или иной категории */
const ProductsList = (props) =>
{
  // const { navigation } = props;
  const GetProductsItem = ({item}) => {
    return (
        <ProductsItem id={item.productId} data={item}/>
    )
};
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    const [error, setError] = useState(false);
    
    // Получаем данные от сервера
    useEffect( () =>
    {
        fetch(`${address}graphql`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    {
                        products(where: {categoryId: ${state.currentCategory.id}}) {
                            nodes {
                                productId
                                name
                                description
                                image {
                                  mediaDetails {
                                    file
                                  }
                                }
                                ... on VariableProduct {
                                  variations {
                                    nodes {
                                      price
                                      variationId
                                      name
                                    }
                                  }
                                  attributes {
                                    nodes {
                                      attributeId
                                      name
                                      options
                                    }
                                  }
                                }
                                ... on SimpleProduct {
                                  price
                                }
                              }
                        }
                    }
                `,
            }),
            })
            .then(res => {return res.json()})
            .then( (res) => 
                {
                    const {data} = res
                   
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
                style={styles.productslist}
                locations={[0, 1.0]}
                colors={['#2454e5', '#499eda']} />
                <Header {...props} showCart={true}/>
            { state?.products[state?.currentCategory.id]?.length ?
            <FlatList
            data={state?.products[state?.currentCategory?.id]}
            renderItem={GetProductsItem}
            keyExtractor={item => item.productId}/>
              :
              <></>
            }
        </>
    );
}

export default ProductsList;