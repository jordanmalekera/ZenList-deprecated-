import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { AniMedia, AniMediaSort, AniMediaType, AniPage, AniResponse } from "../types/ANIL/interfaces";

const http = axios.create();
http.defaults.baseURL = 'https://graphql.anilist.co'
http.defaults.responseType = 'json';
http.defaults.method = 'POST';
http.defaults.headers['Content-Type'] = 'application/json';

export const anilistService = {
    getMediaById: async (id: number) => {
        return http({
            data: {
                query: `{
                            Media(id: ${id}) {
                                id
                                title {
                                    english
                                    romaji
                                }
                                description
                                coverImage {
                                    extraLarge
                                }
                                bannerImage
                                trailer {
                                    id
                                    site
                                    thumbnail
                                }
                                genres
                                averageScore
                                popularity
                                studios {
                                    nodes {
                                      name
                                    }
                                }
                            }
                        }`
            }
        })
            .then((response: AxiosResponse<AniMedia>) => { return response.data })
            .catch((error) => Alert.alert("Error", error.toString()))
    },
    getTopMedias: async (type: AniMediaType, sort: AniMediaSort) => {
        return http({
            data: {
                query: `{
                        Page(page: 1) {
                            media(type: ${AniMediaType[type]}, sort: ${AniMediaSort[sort]}) {
                                id
                                title {
                                    english
                                    romaji
                                }
                                description
                                coverImage {
                                    extraLarge
                                }
                                bannerImage
                                trailer {
                                    id
                                    site
                                }
                            }
                        }
                    }`
            }
        })
            .then((response: AxiosResponse<AniResponse<AniPage<AniMedia>>>) => { return response.data.data['Page']['media'] })
            .catch((error) => Alert.alert("Error", error.toString()))
    },
    getCurrentSeasonMedias: async (type: AniMediaType, sort: AniMediaSort) => {
        const current = new Date();
        const currentYear = current.getFullYear();
        const currentMonth = current.getMonth();
        let season
        switch (true) {
            case (currentMonth === 12 || currentMonth <= 2):
                season = 'WINTER'
                break;
            case (currentMonth >= 3 && currentMonth <= 5):
                season = 'SPRING'
                break;
            case (currentMonth >= 6 && currentMonth <= 8):
                season = 'SUMMER'
                break;
            case (currentMonth >= 9 && currentMonth <= 11):
                season = 'FALL'
                break;
            default:
                season = ''
        }
        return http({
            data: {
                query: `{
                        Page(page: 1) {
                            media(type: ${AniMediaType[type]}, season: ${season}, seasonYear: ${currentYear}, sort: ${AniMediaSort[sort]}) {
                                id
                                title {
                                    english
                                    romaji
                                }
                                description
                                coverImage {
                                    extraLarge
                                }
                                bannerImage
                            }
                        }
                    }`
            }
        })
            .then((response: AxiosResponse<AniResponse<AniPage<AniMedia>>>) => { return response.data.data['Page']['media'] })
            .catch((error) => Alert.alert("Error", error.toString()))
    },
    getTrailers: async (type: AniMediaType, sort: AniMediaSort) => {
        return http({
            data: {
                query: `{
                        Page(page: 1) {
                            media(type: ${AniMediaType[type]}, sort: ${AniMediaSort[sort]}) {
                                id
                                title {
                                    english
                                    romaji
                                }
                                coverImage {
                                    extraLarge
                                }
                                bannerImage
                            }
                        }
                    }`
            }
        })
            .then((response: AxiosResponse<AniResponse<AniPage<AniMedia>>>) => { return response.data.data['Page']['media'] })
            .catch((error) => Alert.alert("Error", error.toString()))
    },
}