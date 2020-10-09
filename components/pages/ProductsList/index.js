import React, {useState, useContext, useEffect, useLayoutEffect} from "react";
import { dispatchContext } from "../../../contexts";
import { Animated, FlatList } from "react-native";
import styles from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import LinearGradient from 'expo-linear-gradient';
import {HeaderBackButton, HeaderCartButton, HeaderTitle} from "./../../Header/index";
import ProductsItem from './ProductsItem/index';
import { STORE_ADDRESS } from "../../../config";

import {
    SetProductsList,
} from "../../../actions";

import { getProductListQuery } from "../../../queries";
import OurActivityIndicator from "../../OurActivityIndicator";

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocallyAnimatedFlatList = ({data}) => {
    const x = new Animated.Value(0);
    const y = new Animated.Value(0);
    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true,
    });

    const renderProductItem = ({item, index})=>{
        return (
            <ProductsItem index={index} id={item.productId} data={item} x={x} y={y} galleryImg={item.galleryImages?.nodes[1]?.mediaDetails?.file}
            imageUrl={item.image?.mediaDetails?.file} name={item.name} />
        )
    };

    return (
        <AnimatedFlatList
            contentContainerStyle={{paddingTop: 12}}
            initialNumToRender={2}
            data={data}
            renderItem={ renderProductItem }
            keyExtractor={item => String(item.productId)}

            {...{ onScroll }}
        />
    )
};

const MemoedLocallyAnimatedFlatList = React.memo(LocallyAnimatedFlatList);

/**Список товаров той или иной категории */
const ProductsList = (props) => {
    const { navigation } = props;
    const { currentCategory } = props.route.params;

    const [gradStart, gradEnd] = ['#499eda', '#2454e5'];

    useLayoutEffect( () => {
        navigation.setOptions({
            headerLeft: (props)=><HeaderBackButton navigation={navigation}/>,
            headerCenter: (props)=><HeaderTitle navigation={navigation} title={currentCategory.name}/>,
            headerRight: (props)=><HeaderCartButton navigation={navigation}/>,
            headerStyle: {
                backgroundColor: gradStart,
            },
        });
    }, [navigation]);
  
    
    //const dispatch = useContext(dispatchContext);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    // Получаем данные от сервера
    useEffect( () => {
        fetch(`${STORE_ADDRESS}graphql`, {
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
                        //(SetProductsList(data, currentCategory.id));
                        setData([...data.products.nodes]);
                })
            // Иначе показываем ошибку
            .catch(err => {setError(true)})
    }, [currentCategory]);

    return (
        <>
            <LinearGradient
                style={styles.productList}
                locations={[0, 1.0]}
                colors={[gradStart, gradEnd]} />
            {
                data ?
                    <MemoedLocallyAnimatedFlatList data={data}/>
                :
                    <OurActivityIndicator error />
            }
        </>
    );
};

export default React.memo(ProductsList);