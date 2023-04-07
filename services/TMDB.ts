import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { TMDBPage } from "../types/TMDBTypes";
import { TMDB_AUTH } from "./API";

const http = axios.create();
http.defaults.baseURL = 'https://api.themoviedb.org/3'
http.defaults.responseType = 'json';
http.defaults.params = {'api_key': TMDB_AUTH.KEY};

type TMDBEndpoint = "/account" | "/authentication" | "/certification" | "/collection" | "/company" | "/configuration" | "/credit" | "/discover" | "/find" | "/genre" | "/guest_session" | "/keyword" | "/list" | "/movie" | "/network" | "/trending" | "/person" | "/review" | "/search" | "/tv" | "/watch";
export const TMDBService = {
    get: async (endpoint: TMDBEndpoint, id?: number | string, propEndpoint?: string) => {
        let request = endpoint;
        if (id) request += "/" + id;
        if (propEndpoint) request += propEndpoint;
        return http.get(request)
            .then((response: AxiosResponse<TMDBPage>) => {
                if(propEndpoint) {
                  return response.data.results  
                }
                else {
                    return response.data  
                }
             })
            .catch((error) => {
                Alert.alert("Error", error.toString())
                console.log(error)
        })      
    }
}