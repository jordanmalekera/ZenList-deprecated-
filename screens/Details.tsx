import { Text, View, ScrollView, Header } from '../components/Themed'
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import React from 'react'
import { AniMedia, AniResponse } from '../types/AnilistTypes';
import { useQuery } from '@tanstack/react-query';
import { anilistService } from '../services/Anilist';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import { TMDBService } from '../services/TMDB';

export default function Details({ route }: any) {
    const category = useSelector((state: RootState) => state.categories.value)

    const id: number = route.params.id;
    const fetchData = async () => {
        let response: any;
        if(category === Category.ANIME_MANGA) {response = await anilistService.getMediaById(id); return response.data['Media']};
        if(category === Category.MOVIES_SERIES) {response = await TMDBService.get("/movie", id); return response};
    }

    const { data, isLoading, isError } = useQuery(['Details' + id], fetchData)
    if (isLoading) return <Text>Loading...</Text>
    else if (isError) return <Text>Error</Text>
    else {
        let image = "";
        if(category === Category.ANIME_MANGA) {
           image = data.coverImage.extraLarge
        }
        if(category === Category.MOVIES_SERIES) {
            image = 'https://image.tmdb.org/t/p/original' + data.poster_path;
        }
        return (
            <ScrollView>
                    <Image source={{ uri: image }} style={styles.coverImage}></Image>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    view: {
        paddingHorizontal: 20
    },
    coverImage: {
        height: 140,
        width: '30%'
    },
    MediaContent: {
        position: 'absolute',
        top: '72%',
        width: '100%',
        zIndex: 3,
        backgroundColor: 'transparent'

    },
    MediaTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    MediaGenres: {
        zIndex: 3,
    }
})
