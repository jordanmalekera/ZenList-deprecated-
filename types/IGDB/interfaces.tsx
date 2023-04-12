import { AgeRatingContentDescriptionCategory, IGDBAgeRatingCategory, IGDBAgeRatingRating, IGDBDateEnum, IGDBExternalGameCategory, IGDBExternalGameMedia, IGDBGameCatagory, IGDBGameStatus, IGDBPlatformCategory, IGDBPlatformWebsiteCategory, IGDBRegionEnum, IGDBWebsiteCategory } from "./enums"

export interface IGDBGame {
    age_ratings: IGDBAgeRating[],
    aggregated_rating: number,
    aggregated_rating_count: number,
    alternative_names: IGDBAlternativenames[],
    artworks: IGDBArtworks[],
    bundles: IGDBGame[],
    category: IGDBGameCatagory,
    checksum: string,
    collection: IGDBCollection,
    cover: IGDBCover,
    created_at: Date,
    dlcs: IGDBGame[],
    expanded_games: IGDBGame[],
    expansions: IGDBGame[],
    external_games: IGDBExternalGame[],
    first_release_date: Date,
    follows: number,
    forks: IGDBGame[],
    franchise: IGDBFranchise,
    franchises: IGDBFranchise[],
    game_engines: IGDBGameEngine[],
    game_localizations: IGDBGameLocalization[],
    game_modes: IGDBGameMode[],
    genres: IGDBGenre[],
    hypes: number,
    involved_companies: IGDBInvolvedCompany[],
    keywords: IGDBKeyword[],
    language_supports: IGDBLanguageSupport[],
    multiplayer_modes: IGDBMultiplayerMode[],
    name: string,
    parent_game: IGDBGame,
    platforms: IGDBPlatform[],
    player_perspectives: IGDBPlayerPerspective[],
    ports: IGDBGame[],
    rating: number,
    rating_count: number,
    release_dates: IGDBReleaseDate[],
    remakes: IGDBGame[],
    remasters: IGDBGame[],
    screenshots: IGDBScreenshot[],
    similar_games: IGDBGame[],
    slug: string,
    standalone_expansions: IGDBGame[],
    status: IGDBGameStatus,
    storyline: string,
    summary: string,
    tags: number,
    themes: IGDBTheme[],
    total_rating: number,
    total_rating_count: number,
    updated_at: Date,
    url: string,
    version_parent: IGDBGame,
    version_title: string,
    videos: IGDBGameVideo[],
    websites: IGDBWebsite[]
}

interface IGDBAgeRating {
    category: IGDBAgeRatingCategory,
    checksum: string,
    content_descriptions: IGDBAgeRatingContentDiscreption[],
    rating: IGDBAgeRatingRating,
    rating_cover_url: string,
    Sypnosis: string
}

interface IGDBAgeRatingContentDiscreption {
    category: AgeRatingContentDescriptionCategory,
    checksum: string,
    description: string
}

interface IGDBAlternativenames {
    checksum: string,
    comment: string,
    game: IGDBGame,
    name: string
}

interface IGDBArtworks {
    alpha_channel: boolean,
    animated: boolean,
    checksum: string,
    game: IGDBGame,
    height: number
    image_id: string,
    url: string,
    width: number
}

interface IGDBCollection {
    checksum: string,
    created_at: Date,
    games: IGDBGame,
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBCompany {
    change_date: Date,
    change_date_category: IGDBDateEnum,
    changed_company_id: IGDBCompany,
    checksum: string,
    country: number,
    created_at: Date,
    description: string,
    developed: IGDBGame[],
    logo: IGDBCompanyLogo,
    name: string,
    parent: IGDBCompany,
    published: IGDBGame[],
    slug: string,
    start_date: Date,
    start_date_category: IGDBDateEnum,
    updated_at: Date,
    url: string,
    websites: IGDBCompanyWebsite
}

interface IGDBCompanyLogo {
    alpha_channel: boolean,
    animated: boolean,
    checksum: string,
    height: number,
    image_id: string,
    url: string,
    width: number
}

interface IGDBCompanyWebsite {
    category: IGDBWebsiteCategory,
    checksum: string,
    trusted: boolean,
    url: string
}

interface IGDBCover {
    alpha_channel: boolean,
    animated: boolean,
    checksum: string,
    game: IGDBGame,
    game_localization: IGDBGameLocalization,
    height: number,
    image_id: string,
    url: string,
    width: number
}

interface IGDBExternalGame {
    category: IGDBExternalGameCategory,
    checksum: string,
    countries: number[],
    created_at: Date,
    game: IGDBGame,
    media: IGDBExternalGameMedia,
    name: string,
    platform: IGDBPlatform,
    uid: string,
    updated_at: Date,
    url: string,
    year: number

}

interface IGDBFranchise {
    checksum: string,
    created_at: Date,
    games: IGDBGame[],
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBGameEngine {
    checksum: string,
    companies: IGDBCompany[]
    created_at: Date,
    games: IGDBGame[],
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBGameLocalization {
    checksum: string,
    cover: IGDBCover,
    created_at: Date,
    game: IGDBGame,
    name: string,
    region: IGDBRegion,
    updated_at: Date

}

interface IGDBGameMode {
    checksum: string,
    created_at: Date,
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBGenre {
    checksum: string,
    created_at: Date,
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBInvolvedCompany {
    checksum: string,
    company: IGDBCompany
    created_at: Date,
    developer: boolean,
    game: IGDBGame,
    porting: boolean,
    publisher: boolean,
    supporting: boolean,
    updated_at: Date
}

interface IGDBKeyword {
    checksum: string,
    created_at: Date,
    name: string,
    slug: string,
    updated_at: Date,
    url: string

}

interface IGDBLanguage {
    checksum: string,
    created_at: Date,
    locale: string,
    name: string,
    native_name: string,
    updated_at: Date
}

interface IGDBLanguageSupport {
    checksum: string,
    created_at: Date,
    game: IGDBGame,
    language: IGDBLanguage,
    language_support_type: IGDBLanguageSupportType,
    updated_at: Date
}

interface IGDBLanguageSupportType {
    checksum: string,
    created_at: Date,
    name: string,
    updated_at: Date
}

interface IGDBMultiplayerMode {
    campaigncoop: boolean,
    checksum: string,
    dropin: boolean,
    game: IGDBGame,
    lancoop: boolean,
    offlinecoop: boolean,
    offlinecoopmax: number,
    offlinemax: number,
    onlinecoop: boolean,
    onlinecoopmax: number,
    onlinemax: number,
    platform: IGDBPlatform,
    splitscreen: boolean,
    splitscreenonline: boolean
}

interface IGDBPlatform {
    abbreviation: string,
    alternative_name: string,
    category: IGDBPlatformCategory,
    checksum: string,
    created_at: Date,
    generation: number,
    name: string,
    platform_family: IGDBPlatformFamily,
    platform_logo: IGDBPlatformLogo,
    slug: string,
    summary: string,
    updated_at: Date,
    url: string,
    versions: IGDBPlatformVersion,
    websites: IGDBPlatformWebsite
}

interface IGDBPlatformFamily {
    checksum: string,
    name: string,
    slug: string
}

interface IGDBPlatformLogo {
    alpha_channel: boolean,
    animated: boolean,
    checksum: string,
    height: number,
    image_id: number,
    url: string,
    width: number
}

interface IGDBPlatformVersion {
    checksum: string,
    companies: IGDBCompany[],
    connectivity: string,
    cpu: string,
    graphics: string,
    main_manufacturer: IGDBPlatformVersionCompany,
    media: string,
    memory: string,
    name: string,
    os: string,
    output: string,
    platform_logo: IGDBPlatformLogo,
    platform_version_release_dates: IGDBPlatformVersionReleaseDate,
    resolutions: string,
    slug: string,
    sound: string,
    storage: string,
    summary: string,
    url: string
}

interface IGDBPlatformVersionCompany {
    checksum: string,
    comment: string,
    company: IGDBCompany,
    developer: boolean,
    manufacturer: boolean
}

interface IGDBPlatformVersionReleaseDate {
    category: IGDBDateEnum,
    checksum: string,
    created_at: Date,
    date: Date,
    human: string,
    m: number,
    platform_version: IGDBPlatformVersion,
    region: IGDBRegionEnum,
    updated_at: Date,
    y: number
}

interface IGDBPlatformWebsite {
    category: IGDBPlatformWebsiteCategory,
    checksum: string,
    trusted: boolean,
    url: string
}

interface IGDBPlayerPerspective {
    checksum: string,
    created_at: Date,
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBRegion {
    category: string,
    checksum: string,
    created_at: Date,
    identifier: string,
    name: string,
    updated_at: Date
}

interface IGDBReleaseDate {
    category: IGDBDateEnum,
    checksum: string,
    created_At: Date,
    date: Date,
    game: IGDBGame,
    human: string
    m: number,
    platform: IGDBPlatform,
    region: IGDBRegionEnum,
    updated_at: Date,
    y: number
}

interface IGDBScreenshot {
    alpha_channel: boolean,
    animated: boolean,
    checksum: string,
    game: IGDBGame,
    height: number
    image_id: string,
    url: string,
    width: number
}

interface IGDBTheme {
    checksum: string,
    created_at: Date,
    name: string,
    slug: string,
    updated_at: Date,
    url: string
}

interface IGDBGameVideo {
    checksum: string,
    game: IGDBGame,
    name: string,
    video_id: string
}

interface IGDBWebsite {
    category: IGDBWebsiteCategory,
    checksum: string,
    game: IGDBGame,
    trusted: boolean,
    url: string
}