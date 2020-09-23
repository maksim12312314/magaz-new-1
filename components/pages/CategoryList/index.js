import React, { useState, useContext, useEffect } from "react";
import { AsyncStorage } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { stateContext, dispatchContext } from "../../../contexts";
import CategoryItem from "./CategoryItem";
import styles from "./styles";
import Header from "../../Header/index";
import config from "../../../config";

import {
    SetCategoriesList,
} from "../../../actions";
import { FlatList } from "react-native-gesture-handler";

const address = config.getCell("StoreAddress");

/**Список категорий товаров*/
const CategoryList = (props) =>
{
    const { navigation } = props;

    const GetCategoryItem = ({item}) => {
        return (
            <CategoryItem navigation={navigation} name={item.name} id={item.productCategoryId} imageUrl={item?.image?.mediaDetails?.file}/>
        )
    };

    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);
    
	const [error, setError] = useState(false);

    // Получаем данные от сервера или хранилища
    useEffect( () =>
    {
        if ( !state?.categories?.length )
        {
            let categories;
            ( async () =>
            {
                // Получаем список категорий с хранилища
                categories = await AsyncStorage.getItem("categoryList");

                // И устанавливаем его если есть
                if ( categories )
                {
                    categories = JSON.parse(categories);
                    
                    dispatch(SetCategoriesList(categories));
                }
            })();
            
            fetch(`${address}graphql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    query: `
                        {
                            productCategories(where: {hideEmpty: true}) {
                                nodes {
                                  name
                                  productCategoryId
                                  image {
                                    mediaDetails {
                                      file
                                    }
                                  }
                                }
                              }
                        }
                    `,
                }),
                })
				.then(res => res.json())
                .then( ({data}) => 
                    {
                        ( async () =>
                        {
                            dispatch(SetCategoriesList(data));
                            await AsyncStorage.setItem("categoryList", JSON.stringify(data));
                        })();
                    })
                .catch(err => setError(true));

        }
    }, []);


    return (
        <>
        <LinearGradient
                style={styles.background}
                locations={[0, 1.0]}
                colors={['#078998', '#65B7B9']} />
        {state?.categories?.length ?
                <Header {...props} showCart={true}/>
                : error ? <Header {...props} showCart={false}/>
                    : <></>
            }
            <FlatList
            contentContainerStyle={{alignItems:"center", justifyContent: "center"}}
            numColumns={2}
            data={state.categories}
            renderItem={GetCategoryItem}
            keyExtractor={item => item.productCategoryId}/>
        </>
    );
}

export default CategoryList;