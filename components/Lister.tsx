import { useNavigation } from '@react-navigation/native';
import { FlashList, FlashListProps } from '@shopify/flash-list'
import React from 'react'
import { TouchableOpacity, Image } from 'react-native';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { AniPageResponse } from '../types/AnilistTypes';
import { View, Text } from './Themed';

export function Lister({ title, apiData, style, flashListProps }: any) {
    const category = useSelector((state: RootState) => state.categories.value)
    
    const fetchData = async () => {
        if(category.anime_manga) {
            const AniResponse: AniPageResponse = await apiData;
            return AniResponse.data.Page
        } else if(category.movies_series) {
            
        }
    }

    const { data, status } = useQuery(title, fetchData)
    if (status === "loading") return <Text>Loading...</Text>
    else if (status === "idle") return <Text>Idle...</Text>
    else if (status === 'error' || data == undefined) return <Text>Error</Text>
    else {
        type ListItemProp = { item:any}
        return (
            <View style={style.view}>
                <FlashList
                    data={data.media}
                    renderItem={({ item }: ListItemProp) => <ListItem item={item} style={style}/>}
                    keyExtractor={(item:any) => item.id.toString()}
                    horizontal={true}
                    estimatedItemSize={129}
                    ListEmptyComponent={<Text>No results</Text>}
                    showsHorizontalScrollIndicator={false}
                    {...flashListProps}
                />
            </View>
        )
    }
}

function ListItem({ item, style }:any ) {
    const navigation = useNavigation()
    let title;
    (item.title.english) ? title = item.title.english : title = item.title.romaji
    return (
        <TouchableOpacity style={style.listItem} onPress={() => {
            navigation.navigate('Root', {screen: 'Details', params: {id: item.id}})
        }}>
            <Image source={{ uri: item.coverImage.extraLarge }} style={style.coverImage}></Image>
            <Text numberOfLines={2} style={style.mediaTitle}>{title}</Text>
        </TouchableOpacity>
    )
}
