import { Text, View, ScrollView, Header } from '../components/Themed'
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import React from 'react'
import { AniMedia, AniResponse } from '../types/AnilistTypes';
import { useQuery } from '@tanstack/react-query';
import { anilistService } from '../services/Anilist';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import { TMDBService } from '../services/TMDB';
import { TMDBMovie } from '../types/TMDBTypes';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Lists from './Lists';
import Profile from './Profile';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { IGDBService } from '../services/IGDB';
import { IGDBGame } from '../types/IGDB/interfaces';

export default function Details({ route }: any) {
    const category = useSelector((state: RootState) => state.categories.value)

    const id: number = route.params.id;
    const fetchData = async () => {
        let response: any;
        if (category === Category.ANIME_MANGA) { response = await anilistService.getMediaById(id); return response.data['Media'] };
        if (category === Category.MOVIES_SERIES) { response = await TMDBService.get("/movie", id); return response };
        if (category === Category.GAMES) { response = await IGDBService.get("/games", id); return response };
    }

    const { data, isLoading, isError } = useQuery(['Details' + id], fetchData)
    if (isLoading) return <Text>Loading...</Text>
    else if (isError) return <Text>Error</Text>
    else {
        if (category === Category.ANIME_MANGA) {
            const aniData = data as AniMedia;
            return <DetailPage
                title={(aniData.title.english) ? aniData.title.english : aniData.title.romaji}
                genres={aniData.genres}
                image={aniData.coverImage.extraLarge}
            />
        }
        else if (category === Category.MOVIES_SERIES) {
            const TMDBData = data as TMDBMovie;
            return <DetailPage
                title={TMDBData.title}
                genres={TMDBData.genres.map((genre) => genre.name)}
                image={'https://image.tmdb.org/t/p/original' + TMDBData.poster_path}
            />
        }
        else {
            const IGDBData = data[0] as IGDBGame;
            console.warn(Object.values(IGDBData))
            return <DetailPage
                title={IGDBData.name}
                genres={IGDBData.genres.map((genre) => genre.name)}
                image={(IGDBData.cover) ? "https:" + IGDBData.cover.url.replace("t_thumb", "t_cover_big") : ""}
            />
        }
    }
}

const DetailPage = ({ title, genres, image }: any) => {
    return (
        <ScrollView style={styles.view}>
            <View style={styles.top}>
                <Image source={{ uri: image }} style={styles.coverImage}></Image>
                <View style={{ flexDirection: 'column' }}>
                    <Text>{title}</Text>
                    <Text>{genres.join(", ")}</Text>
                </View>
            </View>
            <View>
                <MyTabs />
            </View>
        </ScrollView>
    )
}
    
const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
        pagerStyle={{height: 600}}
        backBehavior='history'
        screenOptions={{
            tabBarStyle: {backgroundColor: 'transparent'},
            tabBarGap: 20,
            tabBarItemStyle: { width: 90, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 14 },
            tabBarIndicatorStyle: { backgroundColor: 'white', height: '100%', width: '26%', borderRadius: 14 },

            tabBarScrollEnabled: true,
            tabBarActiveTintColor: 'black',
        }}
        >
            <Tab.Screen name="Over" component={Profile} />
            <Tab.Screen name="Settings" component={Profile} />
            <Tab.Screen name="Test" component={Profile} />
            <Tab.Screen name="Read" component={Profile} />
        </Tab.Navigator>
    );
}

const CatSection = () => {
    return (
        View
    )
}

const styles = StyleSheet.create({
    view: {
        paddingHorizontal: '4%'
    },
    top: {
        display: 'flex',
        flexDirection: 'row'
    },
    coverImage: {
        height: 180,
        width: '34%',
        borderRadius: 12
    },
})
