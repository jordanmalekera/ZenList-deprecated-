import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { View, Text, Header } from '../../components/Themed'
import { AniMedia, AniMediaTrailer } from '../../types/ANIL/interfaces'

const Overview = ({ data }: { data: AniMedia }) => {
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