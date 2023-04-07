export interface AniResponse<T> {
    data: {
        [property: string]: T
    }
}

export interface AniPage<T> {
    // pageInfo: AniPageInfo,  
    readonly [property: string]: T[],
}

type AniPageQuery = 'media' | 'user' | 'character';

interface AniPageInfo {
    total: number,
    perPage: number,
    currentPage: number,
    lastPage: number,
    hasNextPage: boolean
}

// All types for Media
// type AniMediaQuery =
// id: Int
// idMal: Int
// startDate: FuzzyDateInt
// endDate: FuzzyDateInt
// season: MediaSeason
// seasonYear: Int
// type: MediaType
// format: MediaFormat
// status: MediaStatus
// episodes: Int
// duration: Int
// chapters: Int
// volumes: Int
// isAdult: Boolean
// genre: String
// tag: String
// minimumTagRank: Int
// tagCategory: String
// onList: Boolean
// licensedBy: String
// licensedById: Int
// averageScore: Int
// popularity: Int
// source: MediaSource
// countryOfOrigin: CountryCode
// isLicensed: Boolean
// search: String
// id_not: Int
// id_in: [Int]
// id_not_in: [Int]
// idMal_not: Int
// idMal_in: [Int]
// idMal_not_in: [Int]
// startDate_greater: FuzzyDateInt
// startDate_lesser: FuzzyDateInt
// startDate_like: String
// endDate_greater: FuzzyDateInt
// endDate_lesser: FuzzyDateInt
// endDate_like: String
// format_in: [MediaFormat]
// format_not: MediaFormat
// format_not_in: [MediaFormat]
// status_in: [MediaStatus]
// status_not: MediaStatus
// status_not_in: [MediaStatus]
// episodes_greater: Int
// episodes_lesser: Int
// duration_greater: Int
// duration_lesser: Int
// chapters_greater: Int
// chapters_lesser: Int
// volumes_greater: Int
// volumes_lesser: Int
// genre_in: [String]
// genre_not_in: [String]
// tag_in: [String]
// tag_not_in: [String]
// tagCategory_in: [String]
// tagCategory_not_in: [String]
// licensedBy_in: [String]
// licensedById_in: [Int]
// averageScore_not: Int
// averageScore_greater: Int
// averageScore_lesser: Int
// popularity_not: Int
// popularity_greater: Int
// popularity_lesser: Int
// source_in: [MediaSource]
// sort: [MediaSort]

export interface AniMedia {
    id: number,
    idMal: number,
    title: AniMediaTitle,
    type: AniMediaType,
    format: AniMediaFormat,
    status: AniMediaStatus,
    description: string,
    startDate: Date,
    endDate: Date,
    season: AniMediaSeason,
    seasonYear: number,
    seasonInt: number,
    episodes: number,
    duration: number,
    chapters: number,
    volumes: number,
    countryOfOrigin: string,
    isLicensed: boolean,
    source: MediaSource,
    hashtag: string,
    trailer: AniMediaTrailer,
    updatedAt: number,
    coverImage: AniMediaCoverImage,
    bannerImage: string,
    genres: string[],
    synonyms: string[],
    averageScore: number,
    meanScore: number,
    popularity: number,
    isLocked: boolean,
    trending: number,
    favourites: number,
    tags: AniMediaTag[],
    // relations: MediaConnection,
    // characters: CharacterConnection,
    // staff: StaffConnection,
    // studios: StudioConnection,
    isFavourite: boolean,
    isFavouriteBlocked: boolean,
    isAdult: boolean,
    // nextAiringEpisode: AiringSchedule,
    // airingSchedule: AiringScheduleConnection,
    // trends: MediaTrendConnection,
    // externalLinks: MediaExternalLink[],
    // streamingEpisodes: MediaStreamingEpisode[],
    // rankings: MediaRank[],
    // mediaListEntry: MediaList,
    // reviews: ReviewConnection,
    // recommendations: RecommendationConnection,
    // stats: MediaStats,
    siteUrl: string,
    autoCreateForumThread: boolean,
    isRecommendationBlocked: boolean,
    isReviewBlocked: boolean,
    modNotes: string,
}

interface AniMediaTitle {
    romaji: string,
    english: string,
    native: string,
    userPreferred: string
}

interface AniMediaTrailer {
    id: string,
    site: string,
    thumbnail: string
}

interface AniMediaCoverImage {
    extraLarge: string,
    large: string,
    medium: string,
    color: string
}

interface AniMediaTag {
    id: number,
    name: string,
    description: string,
    category: string,
    rank: number,
    isGeneralSpoiler: boolean,
    isMediaSpoiler: boolean,
    isAdult: boolean,
    userId: number
}

export enum AniMediaType { ANIME, MANGA}
export enum AniMediaFormat { TV, TV_SHORT, MOVIE, SPECIAL, OVA, ONA, MUSIC, MANGA, NOVEL, ONE_SHOT }
export enum AniMediaStatus { FINISHED, RELEASING, NOT_YET_RELEASED, CANCELLED, HIATUS }
export enum AniMediaSeason { WINTER, SPRING, SUMMER, FALL }
export enum AniMediaSource { ORIGINAL, MANGA, LIGHT_NOVEL, VISUAL_NOVEL, VIDEO_GAME, OTHER, NOVEL, DOUJINSHI, ANIME, WEB_NOVEL, LIVE_ACTION, GAME, COMIC, MULTIMEDIA_PROJECT, PICTURE_BOOK }
export enum AniMediaSort { ID, ID_DESC, TITLE_ROMAJI, TITLE_ROMAJI_DESC, TITLE_ENGLISH, TITLE_ENGLISH_DESC, TITLE_NATIVE, TITLE_NATIVE_DESC, TYPE, TYPE_DESC, FORMAT, FORMAT_DESC, START_DATE, START_DATE_DESC, END_DATE, END_DATE_DESC, SCORE, SCORE_DESC, POPULARITY, POPULARITY_DESC, TRENDING, TRENDING_DESC, EPISODES, EPISODES_DESC, DURATION, DURATION_DESC, STATUS, STATUS_DESC, CHAPTERS, CHAPTERS_DESC, VOLUMES, VOLUMES_DESC, UPDATED_AT, UPDATED_AT_DESC, SEARCH_MATCH, FAVOURITES, FAVOURITES_DESC }