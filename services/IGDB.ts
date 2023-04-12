import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { IGDB_AUTH } from "./API";

const http = axios.create();
http.defaults.baseURL = 'https://api.igdb.com/v4'
http.defaults.responseType = 'json';
http.defaults.method = 'POST';
http.defaults.headers.common["Client-Id"] = IGDB_AUTH.CLIENT_ID;
http.defaults.headers.common["Authorization"] = IGDB_AUTH.ACCES_TOKEN;

export const IGDBService = {
    get: async (endpoint: string) => {
        const data = "fields *, cover.url; sort rating desc; limit 20;"
        return http.post(endpoint, data)
            .then((response: any) => {
                return response.data
             })
            .catch((error) => {
                Alert.alert("Error", error.toString())
                console.log(error)
        })      
    }
}