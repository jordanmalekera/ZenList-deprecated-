import API from "./Api";
import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { AniResponse, MediaType, Page } from "../types/AnilistTypes";

const http = axios.create();
http.defaults.baseURL = 'https://graphql.anilist.co'
http.defaults.responseType = 'json';
http.defaults.method = 'POST';
http.defaults.headers['Content-Type'] = 'application/json';

export const anilistService = {
    getMedias: async (type: MediaType, sort: string) => {
        return http({
            data: {
                query: `{
                        Page(page: 1) {
                            media(type: ${type}, sort: ${sort}) {
                                id
                                title {
                                    english
                                }
                                type
                            }
                        }
                    }`
            }
        })
            .then((response: AxiosResponse) => { console.log(response.data); return response.data })
            .catch((error) => Alert.alert("Error", error.toString()))
    }
}