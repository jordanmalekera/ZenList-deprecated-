import { Text, Header, ScrollView } from '../components/Themed';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { anilistService } from '../services/Anilist';
import React from 'react';
import { Lister } from '../components/Lister';
import { MediaSort, MediaType } from '../types/AnilistTypes';

export default function Home() {
    return (
        <ScrollView style={listStyles.view}>
            <Lister
                title='Trending'
                apiData={anilistService.getTopMedias(MediaType.ANIME, MediaSort.TRENDING_DESC)}
                style={slideStyles}
                flashListProps={{ snapToAlignment: "start", decelerationRate: "normal", snapToInterval: Dimensions.get("window").width }} />
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%', paddingHorizontal: '4%' }}>
                <Header>New anime</Header>
                <Text>See all</Text>
            </TouchableOpacity>
                <Lister
                    title='New anime'
                    apiData={anilistService.getTopMedias(MediaType.ANIME, MediaSort.START_DATE_DESC)}
                    style={listStyles} />
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%', paddingHorizontal: '4%' }}>
                <Header>Popular this season</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <Lister
                title='Popular this season'
                apiData={anilistService.getCurrentSeasonMedias(MediaType.ANIME, MediaSort.POPULARITY_DESC)}
                style={listStyles} />
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%', paddingHorizontal: '4%' }}>
                <Header>Trending</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <Lister
                title='Top 100'
                apiData={anilistService.getTopMedias(MediaType.ANIME, MediaSort.SCORE_DESC)}
                style={listStyles} />
        </ScrollView>
    )
}


const slideStyles = StyleSheet.create({
    listItem: {
        width: Dimensions.get("window").width,
        flexDirection: 'column',
        paddingHorizontal: 12
    },
    coverImage: {
        height: Dimensions.get("window").height / 3.8,
        borderRadius: 12,
        marginBottom: 10,
        position: 'relative',
    },
    listTitle: {
        flexWrap: 'wrap',
        position: 'absolute',
        left: 20,
        bottom: 20,
        fontSize: 26,
        fontWeight: 'bold'

    },
})

const listStyles = StyleSheet.create({
    view: {
        width: '100%',
        marginTop: 4,

    },
    listItem: {
        width: 130,
        paddingHorizontal: 12
    },
    listTitle: {
        paddingHorizontal: '4%'
    },
    coverImage: {
        height: 140,
        borderRadius: 12,
        marginBottom: 10
    },
    mediaTitle: {
        flexWrap: 'wrap'
    }
})
