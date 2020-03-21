import React, { useContext, useEffect } from "react";
import { Text, View, TouchableOpacity, Dimensions, PixelRatio, StyleSheet, AsyncStorage } from "react-native";
import Svg, {Path} from "react-native-svg";
import {Badge} from 'native-base';
import { stateContext, dispatchContext } from "../../contexts";
import OurText from "../OurText";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop:35,
        marginBottom:30,
        minWidth: Dimensions.get("window").width,
    },
    iconBack: {
        width:40.5,
        height:31.5,
        paddingLeft:30,
    },
    text: {
        fontSize: 25,
        color:"#fff",
        width:Dimensions.get("window").width,
    },
    titleText: {
        marginLeft: 30, // Говнофикс
    },
    iconCart: {
        width:40.5,
        height:31.5,
        paddingLeft:70,
    },
});

/** Шапочка приложения с навигацией*/
const Header = (props) =>
{

    const {showBack, showTitle, titleFunc, showCart, navigation} = props;
    
    const state = useContext(stateContext);
    const dispatch = useContext(dispatchContext);


    useEffect( () =>
    {
        (async () =>
        {
            let cartItems = await AsyncStorage.getItem("cartItems");
            cartItems = cartItems || '{"cart":[]}';
            dispatch({type: "SetCartItems", cartItems: JSON.parse(cartItems)});
            dispatch({type: "ComputeTotalPrice"});
        })();
       
    }, []);

    return (
        <View style={styles.container}>
            <View style={Object.assign( {}, styles.iconBack, {flex:1})}>
                {showBack ?
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Svg width="49.5" height="40.5" viewBox="0 0 320 512">
                        <Path id="chevron-left-solid"
                        data-name="chevron left-solid"
                        d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"
                        transform="translate(0 -2.25)"
                        fill="#fff"/>
                    </Svg>
                </TouchableOpacity> : <></>
                }
            </View>
            <View style={Object.assign({},styles.titleText, {flex:1})}>
                {showTitle ?
                <TouchableOpacity activeOpacity={ titleFunc ? 0.2 : 1 } onPress={()=>{ 
                        if (titleFunc)
                            titleFunc();
                    }}>
                    <OurText style={styles.text}>{showTitle}</OurText>
                </TouchableOpacity> : <></>
                }
            </View>
            <View style={Object.assign({},styles.iconCart, {flex:1})}>
                {showCart ?
                <TouchableOpacity onPress={()=>{navigation.navigate('Cart')}}>
                <Svg style={styles.icon} width="49.5" height="40.5" viewBox="0 0 40.5 31.5">
                    <Path id="Icon_awesome-shopping-basket"
                        data-name="Icon awesome-shopping-basket"
                        d="M40.5,15.188v1.125A1.687,1.687,0,0,1,38.813,18H38.25L36.414,30.852a3.375,3.375,0,0,1-3.341,2.9H7.427a3.375,3.375,0,0,1-3.341-2.9L2.25,18H1.688A1.687,1.687,0,0,1,0,16.313V15.188A1.687,1.687,0,0,1,1.688,13.5H6.422L13.93,3.177A2.25,2.25,0,1,1,17.57,5.823L11.987,13.5H28.513L22.93,5.823A2.25,2.25,0,0,1,26.57,3.177L34.078,13.5h4.735A1.687,1.687,0,0,1,40.5,15.188ZM21.938,27.563V19.688a1.688,1.688,0,0,0-3.375,0v7.875a1.688,1.688,0,0,0,3.375,0Zm7.875,0V19.688a1.688,1.688,0,0,0-3.375,0v7.875a1.688,1.688,0,0,0,3.375,0Zm-15.75,0V19.688a1.688,1.688,0,0,0-3.375,0v7.875a1.688,1.688,0,0,0,3.375,0Z"
                        transform="translate(0 -2.25)"
                        fill="#fff"/>
                        {state?.cartItems?.length ?
                    <Badge success style={{width:28,height:28,top:19,left:-15}}>
                        <OurText style={
                            state.cartItems.length < 10 ?
                                {color:'white',top:4, left:4} :
                                {color:'white',top:4}
                            }>
                            {state?.cartItems?.length ? 
                                (() => {
                                    if ( state.cartItems.length < 10 )
                                        return state.cartItems.length;
                                    else
                                        return "9+";
                                })() : 
                                <></>}
                        </OurText>
                        <OurText style={{color:'white',top:-7,left:22,width:200}}>
                            {state.cartTotalPrice}$
                        </OurText>
                    </Badge>
                    : <></>}
                </Svg>
                </TouchableOpacity> : <></>
                }
            </View>
        </View>
    );
}

export default Header;