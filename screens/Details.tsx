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

export default function Details({ route }: any) {
    const id: number = route.params.id;
    const fetchData = async () => {
        const response: any = await anilistService.getMediaById(id);
        return response.data['Media'];
    }

    const { data, status } = useQuery(['mediaDetails'], fetchData)
    if (status === "loading") return <Text>Loading...</Text>
    else if (status === 'error' || data == undefined) return <Text>Error</Text>
    else {
        let image = data.coverImage.extraLarge
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
