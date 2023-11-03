import { Text, View, ScrollView, Header } from '../components/Themed'
import { StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import React from 'react'
import { AniMedia, AniResponse } from '../types/ANIL/interfaces';
import { useQuery } from '@tanstack/react-query';
import { anilistService } from '../services/Anilist';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Category } from '../features/categorySlice';
import { TMDBService } from '../services/TMDB';
import { TMDBMovie } from '../types/TMDB/interfaces';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { IGDBService } from '../services/IGDB';
import { IGDBGame } from '../types/IGDB/interfaces';
import { AntDesign } from '@expo/vector-icons';
import Overview from './detail/Overview';
import Cast from './detail/Cast';
import Staff from './detail/Staff';
import Review from './detail/Review';
import Social from './detail/Social';

let datas: any;

export default function Details({ route }: any) {
    const category = useSelector((state: RootState) => state.categories.value)

    const id: number = route.params.id;
    // const id: number = 145139;
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
            datas = aniData
            return <DetailPage
                title={(aniData.title.english) ? aniData.title.english : aniData.title.romaji}
                genres={aniData.genres}
                image={aniData.coverImage.extraLarge}
            />
        }
        else if (category === Category.MOVIES_SERIES) {
            const TMDBData = data as TMDBMovie;
            datas = TMDBData;
            return <DetailPage
                title={TMDBData.title}
                genres={TMDBData.genres.map((genre) => genre.name)}
                image={'https://image.tmdb.org/t/p/original' + TMDBData.poster_path}
            />
        }
        else {
            const IGDBData = data[0] as IGDBGame;
            return <DetailPage
                title={IGDBData.name}
                genres={IGDBData.genres.map((genre) => genre.name)}
                image={(IGDBData.cover) ? "https:" + IGDBData.cover.url.replace("t_thumb", "t_cover_big") : ""}
            />
        }
    }
}

const DetailPage = ({ title, genres, image }: any) => {
    const colorScheme = useColorScheme();
    return (
        <ScrollView>
            <View style={styles.top}>
                <Image source={{ uri: image }} style={styles.coverImage}></Image>
                <View style={styles.topRight}>
                    <Header numberOfLines={2} style={styles.header}>{title}</Header>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <Text style={styles.genre}>{genres.join(", ")}</Text>
                    </ScrollView>
                    <View style={styles.actions}>
                        <View style={{ width: '33.33%', }}>
                            <AntDesign style={{ textAlign: 'center', paddingBottom: 10 }} name='plus' color={Colors[colorScheme].text} size={26} />
                            <Text style={{ textAlign: 'center' }}>Add to list</Text>
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <AntDesign style={{ textAlign: 'center', paddingBottom: 10 }} name='hearto' color={Colors[colorScheme].text} size={26} />
                            <Text style={{ textAlign: 'center' }}>Favorite</Text>
                        </View>
                        <View style={{ width: '33.33%' }}>
                            <AntDesign style={{ textAlign: 'center', paddingBottom: 10 }} name='edit' color={Colors[colorScheme].text} size={26} />
                            <Text style={{ textAlign: 'center' }}>Score</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.tabs}>
                <MyTabs />
            </View>
        </ScrollView>
    )
}

const Tab = createMaterialTopTabNavigator();

const MyTabs = () => {
    const colorScheme = useColorScheme();
    return (
        <Tab.Navigator
            pagerStyle={{ height: 600, paddingHorizontal: '4%' }}
            backBehavior='history'
            screenOptions={{
                tabBarStyle: { backgroundColor: 'transparent', width: 'auto' },
                tabBarGap: 20,
                tabBarItemStyle: { height: '40%', backgroundColor: Colors[colorScheme].text + 14, width: 'auto', paddingHorizontal: 8, borderRadius: 0 },
                tabBarIndicatorStyle: { height: '100%', backgroundColor: Colors[colorScheme].primary },
                tabBarContentContainerStyle: { paddingHorizontal: '4%', marginVertical: -6, width: 'auto' },
                tabBarIndicatorContainerStyle: { marginLeft: '4%', width: '102%' },
                tabBarScrollEnabled: true,
                animationEnabled: false,
                tabBarLabelStyle: { fontSize: 14, textAlignVertical: 'top', textTransform: 'capitalize' },
                tabBarInactiveTintColor: Colors[colorScheme].text,
                tabBarActiveTintColor: Colors[colorScheme].background,
            }}
        >
            <Tab.Screen name="Overview" children={() => <Overview data={datas} />} />
            <Tab.Screen name="Cast" children={() => <Cast data={datas} />} />
            <Tab.Screen name="Staff" children={() => <Staff data={datas} />} />
            <Tab.Screen name="Review" children={() => <Review data={datas} />} />
            <Tab.Screen name="Social" children={() => <Social data={datas} />} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    view: {

    },
    top: {
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: '4%',
        justifyContent: 'space-between'
    },
    topRight: {
        flexDirection: 'column',
        width: '62%',
    },
    coverImage: {
        height: 170,
        width: '32%',
        borderRadius: 12
    },
    header: {
        fontSize: 20,
        width: '100%',
        paddingBottom: 8,
        flexWrap: 'wrap',
    },
    genre: {
        fontSize: 12,
        width: 'auto'
    },
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderColor: 'red',
        // borderStyle: 'solid',
        // borderWidth: 2
    },
    tabs: {
        marginTop: 20
    },
    indicator: {
        backgroundColor: 'white',
        height: '100%',
        width: 20,
        borderRadius: 12,
        position: 'absolute'
    }
})
