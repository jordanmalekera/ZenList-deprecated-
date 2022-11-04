export interface AniResponse {
    data: {
        Page: Page
    }
}

export interface Page {
    pageInfo: PageInfo,
    users: undefined,
    media: Media[]
    characters: undefined,
}

export interface PageInfo {
    total: number,
    perPage: number,
    currentPage: number,
    lastPage: number,
    hasNextPage: boolean
}

// All types for Media
export interface Media {
    id: number,
    idMal: number,
    title: MediaTitle,
    type: MediaType,
    format: MediaFormat,
    status: MediaStatus,
    description: string,
    startDate: Date,
    endDate: Date,
    season: MediaSeason,
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
    trailer: MediaTrailer,
    updatedAt: number,
    coverImage: MediaCoverImage,
    bannerImage: string,
    genres: string[],
    synonyms: string[],
    averageScore: number,
    meanScore: number,
    popularity: number,
    isLocked: boolean,
    trending: number,
    favourites: number,
    tags: MediaTag[],
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

export interface MediaTitle {
    romaji: string,
    english: string,
    native: string,
    userPreferred: string
}

export interface MediaTrailer {
    id: string,
    site: string,
    thumbnail: string
}

export interface MediaCoverImage {
    extraLarge: string,
    large: string,
    medium: string,
    color: string
}

export interface MediaTag {
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

export type MediaType = 'ANIME' | 'MANGA';

export type MediaFormat = 'TV' | 'TV_SHORT' | 'MOVIE' | 'SPECIAL' | 'OVA' | 'ONA' | 'MUSIC' | 'MANGA' | 'NOVEL' | 'ONE_SHOT';

export type MediaStatus = 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELLED' | 'HIATUS';

export type MediaSeason = 'WINTER' | 'SPRING' | 'SUMMER' | 'FALL';

export type MediaSource = 'ORIGINAL' | 'MANGA' | 'LIGHT_NOVEL' | 'VISUAL_NOVEL' | 'VIDEO_GAME' | 'OTHER' | 'NOVEL' | 'DOUJINSHI' | 'ANIME' | 'WEB_NOVEL' | 'LIVE_ACTION' | 'GAME' | 'COMIC' | 'MULTIMEDIA_PROJECT' | 'PICTURE_BOOK';

export type MediaSort = 'ID' | 'ID_DESC' | 'TITLE_ROMAJI' | 'TITLE_ROMAJI_DESC' | 'TITLE_ENGLISH' | 'TITLE_ENGLISH_DESC' | 'TITLE_NATIVE' | 'TITLE_NATIVE_DESC' | 'TYPE' | 'TYPE_DESC' | 'FORMAT' | 'FORMAT_DESC' | 'START_DATE' | 'START_DATE_DESC' | 'END_DATE' | 'END_DATE_DESC' | 'SCORE' | 'SCORE_DESC' | 'POPULARITY' | 'POPULARITY_DESC' | 'TRENDING' | 'TRENDING_DESC' | 'EPISODES' | 'EPISODES_DESC' | 'DURATION' | 'DURATION_DESC' | 'STATUS' | 'STATUS_DESC' | 'CHAPTERS' | 'CHAPTERS_DESC' | 'VOLUMES' | 'VOLUMES_DESC' | 'UPDATED_AT' | 'UPDATED_AT_DESC' | 'SEARCH_MATCH' | 'FAVOURITES' | 'FAVOURITES_DESC'
// All types for Recomm