import React from "react";
import { View, FlatList} from "react-native";
import styles from "./styles";
import { STORE_ADDRESS } from "../../config";
import OurImage from "../OurImage";


const renderGalleryImg = ({item}) => 
{

    return (
            <View style={styles.left_bottom}>
                <OurImage
                    url={`${STORE_ADDRESS}wp-content/uploads/${item.mediaDetails?.file}`}
                    style={styles.picture_bottom}
                    />
            </View>
    );
};


const GalleryImg = (props) =>
{
const {data} = props;

    return (
    <FlatList 
        contentContainerStyle={styles.list}
        horizontal={true}
        data={data}
        renderItem={renderGalleryImg}
        keyExtractor={(item) => String(data.indexOf(item))}
    />
    );
};



export default GalleryImg;