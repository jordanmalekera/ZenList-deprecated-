import { Text, View, ScrollView } from '../components/Themed'
import { StyleSheet, Image, Dimensions } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import React from 'react'
import { AniMediaResponse, Media } from '../types/AnilistTypes';
import { useQuery } from 'react-query';
import { anilistService } from '../services/Anilist';
import { LinearGradient } from 'expo-linear-gradient';
export default function Details({ route }: any) {
    const id: number = route.params.id;
    const fetchData = async () => {
        const response: AniMediaResponse = await anilistService.getMediaById(id);
        return response.data.Media
    }

    const { data, status } = useQuery('mediaDetails', fetchData)
    if (status === "loading") return <Text>Loading...</Text>
    else if (status === "idle") return <Text>Idle...</Text>
    else if (status === 'error' || data == undefined) return <Text>Error</Text>
    else {
        let image
        // if (data.trailer.thumbnail) image = data.trailer.thumbnail
        if (data.bannerImage) image = data.bannerImage
        else image = data.coverImage.extraLarge
        return (
            <ScrollView style={styles.view}>
                <LinearGradient style={styles.gradient} colors={['transparent', 'black']} />
                    {/* <YoutubePlayer webViewStyle={styles.player} initialPlayerParams={{loop: true, controls: false, modestbranding: true, showClosedCaptions: true}} play mute height={Dimensions.get("window").height / 3.8} videoId={data.trailer.id}/> */}
                    <Image source={{ uri: image }} style={styles.bannerImage}></Image>
                    <View style={styles.MediaContent}>
                        <Text style={styles.MediaTitle}>{data.title.english}</Text>
                        <Text style={styles.MediaGenres}>{data.genres.join(' - ')}</Text>
                    </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    view: {
        height: '100%'
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get("window").height / 2.4,
        width: '100%',
        zIndex: 2,
    },
    bannerImage: {
        height: Dimensions.get("window").height / 2.4,
        width: '100%'
    },
    player: {
        position: 'absolute',
        height: Dimensions.get("window").height / 2.5,
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1
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
