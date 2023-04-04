import axios, { AxiosResponse } from "axios";
import { Alert } from "react-native";
import { TMDB_AUTH } from "./API";

const http = axios.create();
http.defaults.baseURL = 'https://api.themoviedb.org/3/'
http.defaults.responseType = 'json';
http.defaults.headers.common = {'api_key': TMDB_AUTH.KEY}

export const TMDBService = {
    getMovie: async (movieId: number) => {
        return http.get('movie/' + movieId)
        .then((response: AxiosResponse) => { console.log(response.data); return response.data })
        .catch((error) => Alert.alert("Error", error.toString()))
    },
    getPopularMovies: async () => {
        return http.get('movie/popular')
        .then((response: AxiosResponse) => { console.log(response.data); return response.data })
        .catch((error) => Alert.alert("Error", error.toString()))
    }

}