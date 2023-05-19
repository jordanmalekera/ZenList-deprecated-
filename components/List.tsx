import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image, Dimensions } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { View, Text } from './Themed';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import YoutubePlayer from "react-native-youtube-iframe";
import { AniMedia } from '../types/AnilistTypes';

export const List = ({ title, apiData, style, flashListProps, trailer }: any) => {

    const { data, isLoading, isError } = useQuery([title], () => apiData);
    if (isLoading) return <Text>Loading...</Text>
    else if (isError) return <Text>Error</Text>
    else {
        return (
            <View style={style.view}>
                <FlashList
                    data={data}
                    renderItem={({ item }: { item: any }) => <ListItem item={item} trailer={trailer} style={style} />}
                    keyExtractor={(item: any) => item.id.toString()}
                    horizontal={true}
                    estimatedItemSize={1209}
                    ListEmptyComponent={<Text>No results</Text>}
                    showsHorizontalScrollIndicator={false}
                    directionalLockEnabled={true}
                    extraData={data}
                    {...flashListProps}
                />
            </View>
        )
    }
}


const ListItem = ({ item, style, trailer }: any) => {
    const category = useSelector((state: RootState) => state.categories.value)
    const navigation = useNavigation()
    let title: string = "";
    let image;
    let trailerId;
    if (category === Category.ANIME_MANGA) {
        const AniItem = item as AniMedia
        (AniItem.title.english) ? title = item.title.english : title = item.title.romaji;
        image = AniItem.coverImage.extraLarge;
        (AniItem.trailer && AniItem.trailer.site === "youtube") ? trailerId = AniItem.trailer.id : trailerId = "6pX93dXfH9s";

    }
    if (category === Category.MOVIES_SERIES) {
        title = item.title
        image = 'https://image.tmdb.org/t/p/original' + item.poster_path;
    }
    if (category === Category.GAMES) {
        title = item.name
        if (item.cover) {
            console.log(item.cover.url.replace("t_thumb", "'t_cover_big"))
            image = "https:" + item.cover.url.replace("t_thumb", "t_cover_big");
        }
    }

    // if(trailer && category === Category.ANIME_MANGA) {
    //     console.warn("play")
    //     return (
    //     <TouchableOpacity style={style.listItem}>
    //         <View pointerEvents='none'>
    //         <YoutubePlayer webViewStyle={style.coverImage} initialPlayerParams={{loop: false, controls: false, modestbranding: true, showClosedCaptions: true}} play mute height={Dimensions.get("window").height / 3.8} videoId={trailerId}/>
    //         </View>
    //         <Text numberOfLines={2} style={style.mediaTitle}>{title}</Text>
    //     </TouchableOpacity>
    //     )
    // } else {
    return (
        <TouchableOpacity style={style.listItem} onPress={() => {
            navigation.navigate("Root", { screen: "Details", params: { id: item.id } });
        }}>
            <Image source={{ uri: image }} style={style.coverImage}></Image>
            <Text numberOfLines={2} style={style.mediaTitle}>{title}</Text>
        </TouchableOpacity>
    )
    // }
}