import API from "./Api";
import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { AniResponse, MediaSort, MediaType, Page } from "../types/AnilistTypes";

const http = axios.create();
http.defaults.baseURL = 'https://graphql.anilist.co'
http.defaults.responseType = 'json';
http.defaults.method = 'POST';
http.defaults.headers['Content-Type'] = 'application/json';

export const anilistService = {
    getTopMedias: async (type: MediaType, sort: MediaSort) => {
        return http({
            data: {
                query: `{
                        Page(page: 1) {
                            media(type: ${type}, sort: ${sort}) {
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
            .then((response: AxiosResponse) => { console.log(response.data); return response.data })
            .catch((error) => Alert.alert("Error", error.toString()))
    },
    getCurrentSeasonMedias: async (type: MediaType, sort: MediaSort) => {
        const current = new Date();
        const currentYear = current.getFullYear()
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
                            media(type: ${type}, season: ${season}, seasonYear: ${currentYear} sort: ${sort}) {
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
            .then((response: AxiosResponse) => { console.log(response.data); return response.data })
            .catch((error) => Alert.alert("Error", error.toString()))
    }
}