import { TMDBStatus } from "./enums";

export interface TMDBPage<T> {
    page: number;
    results: T[];
    total_results: number;
    total_pages: number;
}

export interface TMDBMovie {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: TMDBCollection;
    budget: number;
    genres: TMDBGenre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: TMDBCompany[];
    production_countries: TMDBCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: TMDBLanguage[];
    status: TMDBStatus;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TMDBCollection {
    id: number;
    name: string;
    overview: string;
    poster_path: any;
    backdrop_path: string;
    parts: TMDBMovie[];
}

interface TMDBLanguage {
    iso_639_1: string;
    name: string;
}

interface TMDBCountry {
    iso_3166_1: string;
    name: string;
}

interface TMDBCompany {
    description: string;
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
    parent_company: string;
}

interface TMDBGenre {
    id: number;
    name: string;
}

interface TMDBNetwork {
    headquarters: string;
    homepage: string;
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface TMDBPeople {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    gender: number;
    homepage: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
  }

  interface TMDBReview {
    id: string;
    author: string;
    author_details: {
      name: string;
      username: string;
      avatar_path: string;
    };
    rating: number;
    content: string;
    created_at: string;
    iso_639_1: string;
    media_id: number;
    media_title: string;
    media_type: string;
    updated_at: string;
    url: string;
  }