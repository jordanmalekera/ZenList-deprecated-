import { Text, View, Header, ScrollView } from '../components/Themed';
import { StyleSheet, TouchableOpacity, Image, RefreshControl, Dimensions } from 'react-native'
import { anilistService } from '../services/Anilist';
import React, { useState } from 'react';
import { AniResponse, Media } from '../types/AnilistTypes';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from 'react-query';
import useColorScheme from '../hooks/useColorScheme';

export default function Discover() {
    const colorScheme = useColorScheme();


    function Lister({ content, func, style, flashListProps }: any) {
        const fetchData = async () => {
            const response: AniResponse = await func;
            return response.data.Page
        }

        const { data, status } = useQuery(content, fetchData)
        if (status === "loading") return <Text>Loading...</Text>
        else if (status === "idle") return <Text>Idle...</Text>
        else if (status === 'error' || data == undefined) return <Text>Error</Text>
        else {
            function ListItem({ item }: any) {
                let title;
                (item.title.english) ? title = item.title.english : title = item.title.romaji
                return (
                    <TouchableOpacity style={style.listItem}>
                        <Image source={{ uri: item.coverImage.extraLarge }} style={style.coverImage}></Image>
                        <Text numberOfLines={2} style={style.mediaTitle}>{title}</Text>
                    </TouchableOpacity>
                )
            }

            return (
                <View>
                    <FlashList
                        data={data.media}
                        renderItem={({ item }) => <ListItem item={item} />}
                        keyExtractor={(item: Media) => item.id.toString()}
                        horizontal={true}
                        estimatedItemSize={129}
                        ListEmptyComponent={<Text>No results</Text>}
                        showsHorizontalScrollIndicator={false}
                        {...flashListProps}
                    />
                </View>
            )
        }
    }

    interface ListProps { title: string, data: Promise<any>, style: any }
    function List({ title, data, style }: ListProps) {
        return (
            <>
                <TouchableOpacity style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14%', paddingBottom: '8%', paddingHorizontal: '4%' }}>
                    <Header>{title}</Header>
                    <Text>See all</Text>
                </TouchableOpacity>
                <Lister content={title} func={data} style={style} />
            </>
        )
    }

    function Slide({ data, style }: ListProps) {
        return <Lister content={'Slide'} func={data} style={style} flashListProps={{ snapToAlignment: "start", decelerationRate: "normal", snapToInterval: Dimensions.get("window").width }} />
    }

    const defaultStyle = { listItem: styles.listItem, coverImage: styles.coverImage, mediaTitle: styles.mediaTitle }
    const slideStyle = { listItem: styles.slideListItem, coverImage: styles.slideCoverImage, mediaTitle: styles.slideMediaTitle }
    return (
        <ScrollView style={styles.view}>
            <Slide
                title=''
                data={anilistService.getTopMedias('ANIME', 'TRENDING_DESC')}
                style={slideStyle} />
            <List
                title='New anime'
                data={anilistService.getTopMedias('ANIME', 'START_DATE_DESC')}
                style={defaultStyle} />
            <List
                title='Popular this season'
                data={anilistService.getCurrentSeasonMedias('ANIME', 'POPULARITY_DESC')}
                style={defaultStyle} />
            <List
                title='Top 100'
                data={anilistService.getTopMedias('ANIME', 'SCORE_DESC')}
                style={defaultStyle} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        width: '100%',
        paddingTop: 20

    },
    slideListItem: {
        width: Dimensions.get("window").width,
        flexDirection: 'column',
        paddingHorizontal: 12
    },
    slideCoverImage: {
        height: Dimensions.get("window").height / 3.8,
        borderRadius: 12,
        marginBottom: 10
    },
    slideMediaTitle: {
        flexWrap: 'wrap'
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
