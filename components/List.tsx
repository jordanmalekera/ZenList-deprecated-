import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, Image } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { View, Text } from './Themed';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';

export function List({ title, apiData, style, flashListProps }: any) {

    const { data, isLoading, isError } = useQuery([title], () => apiData);
    if (isLoading) return <Text>Loading...</Text>
    else if (isError) return <Text>Error</Text>
    else {
        return (
            <View style={style.view}>
                <FlashList
                    data={data}
                    renderItem={({ item }: { item: any }) => <ListItem item={item} style={style} />}
                    keyExtractor={(item: any) => item.id.toString()}
                    horizontal={true}
                    estimatedItemSize={129}
                    ListEmptyComponent={<Text>No results</Text>}
                    showsHorizontalScrollIndicator={false}
                    extraData={data}
                    {...flashListProps}
                />
            </View>
        )
    }
}


function ListItem({ item, style }: { item: any, style: any }) {
    const category = useSelector((state: RootState) => state.categories.value)
    const navigation = useNavigation()
    let title;
    let image;
    if (category === Category.ANIME_MANGA) {
        (item.title.english) ? title = item.title.english : title = item.title.romaji
        image = item.coverImage.extraLarge
    }
     if (category === Category.MOVIES_SERIES) {
        title = item.title
        image = 'https://image.tmdb.org/t/p/original' + item.poster_path;
    }
    return (
        <TouchableOpacity style={style.listItem} onPress={() => {
            navigation.navigate("Root", { screen: "Details", params: { id: item.id } });
        }}>
            <Image source={{ uri: image }} style={style.coverImage}></Image>
            <Text numberOfLines={2} style={style.mediaTitle}>{title}</Text>
        </TouchableOpacity>
    )
}