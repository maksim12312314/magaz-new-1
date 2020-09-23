import React, { useContext, useEffect, useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { addImage, getImage } from "../../db_handler";
import OurText from "../OurText";
import styles from "./styles";

const placeholder = require("../../assets/image_placeholder.png");

const OurImage = (props) => {
    const {url, title, onPress, style} = props;
    const [image, setImage] = useState(Image.resolveAssetSource(placeholder).uri);
    console.log(`url${url}`)
    const onSuccess = ( tr, result )=> {
        if ( !result.rows.length ) {
            fetch(url)
            .then( res =>  res.blob() )
            .then( data => {
                const reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = () => {
                    setImage(reader.result);
                    addImage(url, reader.result);
                };
            });
        } else {
            setImage(url, result.rows[0]);
        }

    };
    const onFail = (tr, err) => {
        console.log(`ERROR TO GET IMAGE.\n\tURL: ${url}\n\tERROR: ${err}`);
    };

    useEffect( () => {
        if ( url )
            getImage(url, onSuccess, onFail);
    }, []);
    

    return (
        <TouchableOpacity style={styles.container} activeOpacity={onPress ? 0 : 1} onPress={onPress}>
            <Image style={style || styles.image} source={{uri: image}}/>
            {
                title ?
                    <OurText style={styles.title}>{title}</OurText> :
                    <></>
            }
        </TouchableOpacity>
    );
};

export default OurImage;