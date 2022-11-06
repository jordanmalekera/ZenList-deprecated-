import { Text, View, ScrollView } from '../components/Themed'
import { StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { AniMediaResponse, Media } from '../types/AnilistTypes';
import { useQuery } from 'react-query';
import { anilistService } from '../services/Anilist';

export default function Details({ route }: any) {
    const id = route.params.id;
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
            <ScrollView>
                <Image source={{ uri: image }} style={styles.bannerImage}></Image>
                <Text>{id}</Text>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    bannerImage: {
        height: Dimensions.get("window").height / 2.5,
        width: '100%'
    }
})
