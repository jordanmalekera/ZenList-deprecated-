import { Text, Header, ScrollView } from '../components/Themed';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { anilistService } from '../services/Anilist';
import React, { useEffect, useState } from 'react';
import { List } from '../components/List';
import { AniMediaSort, AniMediaType } from '../types/AnilistTypes';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import { TMDBService } from '../services/TMDB';

export default function Home() {
    const category = useSelector((state: RootState) => state.categories.value)
    let toShow;

    if(category === Category.ANIME_MANGA) {
        toShow = {
            trending: { 
                title: 'trendingA', 
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.TRENDING_DESC)
            },
            new: { 
                title: 'newA', 
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.TRENDING_DESC)
            },
            popular: { 
                title: 'popularA', 
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.TRENDING_DESC)
            },
            top: { 
                title: 'topA', 
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.TRENDING_DESC)
            },
        }
    } else if (category === Category.MOVIES_SERIES) {
        toShow = {
            trending: { 
                title: 'trendingT', 
                data: TMDBService.get("/movie", "", "/popular") 
            },
            new: { 
                title: 'newT', 
                data: TMDBService.get("/movie", "", "/popular") 
            },
            popular: { 
                title: 'popularT', 
                data: TMDBService.get("/movie", "", "/popular") 
            },
            top: { 
                title: 'topT', 
                data: TMDBService.get("/movie", "", "/popular") 
            },
        }
    } else if (category === Category.GAMES) {
        toShow = {
            trending: { 
                title: 'o', 
                data: []
            },
            new: { 
                title: 'o', 
                data: []
            },
            popular: { 
                title: 'o', 
                data: []
            },
            top: { 
                title: 'o', 
                data: []
            },
        }
    }

    return <HomeSetup data={toShow} ></HomeSetup>
}

const HomeSetup = ({ data }: any) => {
    return (
        <ScrollView style={listStyles.view}>
            {/* Banner */}
            <List
                title={data.trending.title}
                apiData={data.trending.data}
                style={slideStyles}
                flashListProps={{ snapToAlignment: "start", decelerationRate: "normal", snapToInterval: Dimensions.get("window").width }} />
            {/* Section 1 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header>New anime</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.trending.title}
                apiData={data.trending.data}
                style={listStyles} />

            {/* Section 2 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header>Popular this season</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.trending.title}
                apiData={data.trending.data}
                style={listStyles} />

            {/* Section 3 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header>Trending</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.trending.title}
                apiData={data.trending.data}
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
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '14%',
        paddingBottom: '8%',
        paddingHorizontal: '4%'
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

