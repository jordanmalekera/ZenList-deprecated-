export interface TMDBPage {
    page: number,
    results: TMDBMovie[],
    total_results: number,
    total_pages: number
}

export interface TMDBMovie {
    adult: boolean,
    backdrop_path: string,
    belongs_to_collection: TMDBCollection,
    budget: number,
    genres: TMDBGenre[],
    homepage: string,
    id: number,
    imdb_id: string,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: TMDBCompany[],
    production_countries: TMDBCountry[],
    release_date: string,
    revenue: number,
    runtime: number,
    spoken_languages: TMDBLanguage[],
    status: TMDBStatus,
    tagline: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface TMDBCollection {
    id: number
    name: string
    overview: string
    poster_path: any
    backdrop_path: string
    parts: TMDBMovie[]
}

interface TMDBLanguage {
    iso_639_1: string,
    name: string
}

interface TMDBCountry {
    iso_3166_1: string,
    name: string
}

interface TMDBCompany {
    description: string
    headquarters: string
    homepage: string
    id: number
    logo_path: string
    name: string
    origin_country: string
    parent_company: TMDBCompany
}

interface TMDBGenre {
    id: number,
    name: string
}

export enum TMDBStatus {RUMORED, PLANNED, IN_PRODUCTIOM, POST_PRODUCTION, RELEASED, CANCELED}