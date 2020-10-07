import React, {useState, useContext, useEffect, useLayoutEffect} from "react";
import { stateContext, dispatchContext } from "../../../contexts";
import { Animated } from "react-native";
import styles from "./styles";
import { LinearGradient } from 'expo-linear-gradient';
import Header, {HeaderBackButton, HeaderCartButton, HeaderTitle} from "./../../Header/index";
import ProductsItem from './ProductsItem/index';
import config from "../../../config";

import {
    SetProductsList,
} from "../../../actions";

import { FlatList } from "react-native-gesture-handler";
import { getProductList, getProductListQuery } from "../../../queries";
import OurActivityIndicator from "../../OurActivityIndicator";
import {faChevronLeft} from "@fortawesome/free-solid-svg-icons";
import OurIconButton from "../../OurIconButton";

const address = config.getCell("StoreAddress");

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const LocallyAnimatedFlatList = ({data})=>{
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
            scrollEventThrottle={1}
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
  
    
    const dispatch = useContext(dispatchContext);
    const [error, setError] = useState(false);
    const [data, setData] = useState();

    // Получаем данные от сервера
    useEffect( () => {
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