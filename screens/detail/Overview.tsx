import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia, AniMediaTrailer } from '../../types/ANIL/interfaces'
import { Category } from '../../features/categorySlice'
import { TMDBMovie } from '../../types/TMDB/interfaces'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'

const Overview = ({ data }: { data: any }): any => {
    const category = useSelector((state: RootState) => state.categories.value)

    if (category == Category.ANIME_MANGA) {
        return aniOverview(data)
    } else if (category == Category.MOVIES_SERIES) {
        return tmdbOverview(data)
    } else {
        return <View ></View>
    }

}

const aniOverview = (data: AniMedia) => {
    const sypnosis = data.description.split(/<[^>]+>/g);
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.header}>
                <Header>Sypnosis</Header>
                <Text>See more</Text>
            </TouchableOpacity>
            <Text numberOfLines={3} style={(data.studios.nodes[0] || data.studios.nodes.length > 1) ? { marginBottom: 18 } : null}>{sypnosis}</Text>
            {(data.studios.nodes[0]) ? <Text>{"Studio: " + data.studios.nodes[0].name}</Text> : null}
            {(data.studios.nodes.length > 1) ? <Text>{"Producers: " + data.studios.nodes.slice(1).map(n => n.name).join(", ")}</Text> : null}
            <TouchableOpacity style={styles.header}>
                <Header>Details</Header>
                <Text>See more</Text>
            </TouchableOpacity>
            <View style={styles.details}>

            </View>
            {(data.trailer) ? <Trailers trailer={data.trailer} /> : null}
        </View>
    )
}

const tmdbOverview = (data: TMDBMovie) => {
    console.warn(data);
    const date = new Date(data.release_date);
    const months = ["Januari","Februari","March","April","May","June","July","August","September","October","November","December",]
    const modDate = `${months[date.getMonth() + 1].substring(0, 3)} ${date.getDate()}, ${date.getFullYear()}`
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.header}>
                <Header>Sypnosis</Header>
                <Text>See more</Text>
            </TouchableOpacity>
            <Text numberOfLines={3} style={(data.production_companies) ? { marginBottom: 18 } : null}>{data.overview}</Text>
            {/* {(data.studios.nodes[0]) ? <Text>{"Studio: " + data.studios.nodes[0].name}</Text> : null} */}
            {(data.production_companies) ? <Text>{"Producers: " + data.production_companies.map((company) => company.name).join(", ")}</Text> : null}
            <TouchableOpacity style={styles.header}>
                <Header>Details</Header>
                <Text>See more</Text>
            </TouchableOpacity>
            <View style={styles.details}>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "46%"}}>
                    <View style={{ display: 'flex', flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold" }}>Episodes:</Text>
                        <Text style={{ fontWeight: "bold" }}>Type:</Text>
                        <Text style={{ fontWeight: "bold" }}>Start:</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end"}}>
                        <Text >1</Text>
                        <Text></Text>
                        <Text>{modDate}</Text>
                    </View>
                </View>
                <View style={{ display: 'flex', flexDirection: "row", justifyContent: "space-between", width: "46%"}}>
                    <View style={{ display: 'flex', flexDirection: "column" }}>
                        <Text style={{ fontWeight: "bold" }}>Status:</Text>
                        <Text style={{ fontWeight: "bold" }}>Score:</Text>
                        <Text style={{ fontWeight: "bold" }}>End:</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: "column", alignItems: "flex-end" }}>
                        <Text></Text>
                        <Text></Text>
                        <Text>{modDate}</Text>
                    </View>
                </View>
            </View>
            {/* {(data.video) ? <Trailers trailer={data.} /> : null} */}
        </View>
    )
}

const Trailers = ({ trailer }: { trailer: AniMediaTrailer }) => {
    return (
        <>
            <TouchableOpacity style={styles.header}>
                <Header>Trailers</Header>
                <Text>See more</Text>
            </TouchableOpacity>
            <View style={styles.trailerContainer}>
                <Image source={{ uri: trailer.thumbnail }} style={styles.trailerThumb}></Image>
                <Text style={styles.trailerText} numberOfLines={2}>{trailer.site}</Text>
            </View>
        </>
    )
}

export default Overview

const styles = StyleSheet.create({
    view: {
        height: '100%',
        paddingHorizontal: '4%',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 28,
        paddingBottom: 8
    },
    details: {
        display: "flex",
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    trailerContainer: {
        display: 'flex',
        flexDirection: 'row'
    },
    trailerThumb: {
        width: 180,
        height: 180 / 1.8,
        borderRadius: 8
    },
    trailerText: {
        fontWeight: '700',
        fontSize: 18,
        marginLeft: 10

    }
})