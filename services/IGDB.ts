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
    get: async (endpoint: string, id?: number) => {
        let data;
        if (id) data = `fields *, cover.url, genres.name; where id = ${id};`;
        else data = `fields *, cover.url;`;
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