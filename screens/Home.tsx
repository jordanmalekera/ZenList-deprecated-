import { Text, Header, ScrollView } from '../components/Themed';
import { StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { anilistService } from '../services/Anilist';
import React, { useEffect, useState } from 'react';
import { List } from '../components/List';
import { AniMediaSort, AniMediaType } from '../types/ANIL/interfaces';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import { TMDBService } from '../services/TMDB';
import { IGDBService } from '../services/IGDB';

export default function Home() {
    const category = useSelector((state: RootState) => state.categories.value)
    let toShow;

    if (category === Category.ANIME_MANGA) {
        toShow = {
            trending: {
                title: 'trending_anime',
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.TRENDING_DESC)
            },
            new: {
                title: 'newest_anime',
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.START_DATE_DESC)
            },
            popular: {
                title: 'popular_anime',
                data: anilistService.getCurrentSeasonMedias(AniMediaType.ANIME, AniMediaSort.POPULARITY_DESC)
            },
            top: {
                title: 'top_anime',
                data: anilistService.getTopMedias(AniMediaType.ANIME, AniMediaSort.SCORE_DESC)
            },
        }
    } else if (category === Category.MOVIES_SERIES) {
        toShow = {
            trending: {
                title: 'trending_movies',
                data: TMDBService.get("/movie", "", "/popular")
            },
            new: {
                title: 'newest_movies',
                data: TMDBService.get("/movie", "", "/popular")
            },
            popular: {
                title: 'popular_movies',
                data: TMDBService.get("/movie", "", "/popular")
            },
            top: {
                title: 'top_movies',
                data: TMDBService.get("/movie", "", "/popular")
            },
        }
    } else if (category === Category.GAMES) {
        toShow = {
            trending: {
                title: 'trending_games',
                data: IGDBService.get("/games")
            },
            new: {
                title: 'newest_games',
                data: IGDBService.get("/games")
            },
            popular: {
                title: 'popular_games',
                data: IGDBService.get("/games")
            },
            top: {
                title: 'top_games',
                data: IGDBService.get("/games")
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
                flashListProps={{ snapToAlignment: "start", decelerationRate: "normal", snapToInterval: Dimensions.get("window").width, }}
                trailer />
            {/* Section 1 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header style={listStyles.capatalize}>{data.new.title.replace("_", " ")}</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.new.title}
                apiData={data.new.data}
                style={listStyles} />

            {/* Section 2 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header style={listStyles.capatalize}>{data.popular.title.replace("_", " ")}</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.popular.title}
                apiData={data.popular.data}
                style={listStyles} />

            {/* Section 3 */}
            <TouchableOpacity style={listStyles.listHeader}>
                <Header style={listStyles.capatalize}>{data.top.title.replace("_", " ")}</Header>
                <Text>See all</Text>
            </TouchableOpacity>
            <List
                title={data.top.title}
                apiData={data.top.data}
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
    },
    listHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '10%',
        paddingBottom: '6%',
        paddingHorizontal: '4%',
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
    mediaTitle: {},
    capatalize: {
        textTransform: 'capitalize'
    }
})

