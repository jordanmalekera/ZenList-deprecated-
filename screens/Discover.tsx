import { Text, View, Header } from '../components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native'
import { anilistService } from '../services/Anilist';
import React from 'react';
import { AniResponse } from '../types/AnilistTypes';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from 'react-query';



export default function Discover() {

    const fetchData = async () => {
        const response: AniResponse = await anilistService.getMedias('ANIME', 'SCORE_DESC')
        return response.data.Page
    }

    const { data, status } = useQuery("top-100", fetchData)

    function List() {
        if (status === "loading") {
            return <Text>Loading...</Text>
        }
        else if (status === 'error' || data == undefined) {
            return <Text>Error</Text>
        }
        else {
            return (
                <FlashList
                    data={data.media}
                    renderItem={({ item }) => <Text style={{ color: 'white' }}>{item.title.english}</Text>}
                    keyExtractor={item => item.id.toString()}
                    horizontal={true}
                    estimatedItemSize={226}
                    ListEmptyComponent={<Text>No results</Text>}
                />)
        }
    }
    return (
        <View style={styles.view}>
            <TouchableOpacity>
                <Header>Top 100</Header>
            </TouchableOpacity>
            <List />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        height: "20%",
        width: '100%'
    },
    img: {
        width: 20,
        height: 20
    },
    container: {
        flex: 1
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    list: {
        backgroundColor: 'red',
        width: '100%',
        height: "100%"
    }
})
