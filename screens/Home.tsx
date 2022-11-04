import { Text, View, Header, ScrollView } from '../components/Themed';
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { anilistService } from '../services/Anilist';
import React from 'react';
import { AniResponse, Media } from '../types/AnilistTypes';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from 'react-query';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export default function Discover() {
    const colorScheme = useColorScheme();


    function List({ content }: any) {
        const fetchData = async () => {
            if (content === 'topList') {
                const response: AniResponse = await anilistService.getTopMedias('ANIME', 'SCORE_DESC')
                return response.data.Page
            }
            else if (content === 'seasonList') {
                const response: AniResponse = await anilistService.getCurrentSeasonMedias('ANIME', 'POPULARITY_DESC')
                return response.data.Page
            }
            else if (content === 'trendingList') {
                const response: AniResponse = await anilistService.getTopMedias('ANIME', 'TRENDING_DESC')
                return response.data.Page
            }
            else {
                return
            }
        }

        const { data, status } = useQuery(content, fetchData)
        if (status === "loading") {
            return <Text>Loading...</Text>
        }
        else if (status === "idle") {
            return <Text>Idle...</Text>
        }
        else if (status === 'error' || data == undefined) {
            return <Text>Error</Text>
        }
        else {
            function ListItem({ item }: any) {
                let text;
                if(item.title.english) {
                    text = <Text numberOfLines={2} style={styles.mediaTitle}>{item.title.english}</Text>
                }
                else {
                    text = <Text numberOfLines={2} style={styles.mediaTitle}>{item.title.romaji}</Text>
                }
                return (
                    <TouchableOpacity style={styles.listItem}>
                        <Image source={{ uri: item.coverImage.large }} style={styles.coverImage}></Image>
                        {text}
                    </TouchableOpacity>
                )
            }

            return (
                <View>
                    <FlashList
                        data={data.media}
                        renderItem={({ item }) => <ListItem item={item} />}
                        keyExtractor={item => item.id.toString()}
                        horizontal={true}
                        estimatedItemSize={129}
                        ListEmptyComponent={<Text>No results</Text>}
                    />
                </View>
            )
        }
    }

    return (
        <ScrollView style={styles.view} >
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '4%', paddingBottom: '8%' }}>
                <Header>Trending now</Header>
                <FontAwesomeIcon icon={faArrowRight} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
            <List content='trendingList' />
            
            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%' }}>
                <Header>Popular this season</Header>
                <FontAwesomeIcon icon={faArrowRight} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
            <List content='seasonList' />

            <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%' }}>
                <Header>Top 100</Header>
                <FontAwesomeIcon icon={faArrowRight} color={Colors[colorScheme].tint} />
            </TouchableOpacity>
            <List content='topList' />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        height: "34%",
        width: '100%',
        paddingHorizontal: '2%'
    },
    listItem: {
        width: 130,
        flexDirection: 'column',
        paddingEnd: 24,
        // paddingHorizontal: 12,
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
