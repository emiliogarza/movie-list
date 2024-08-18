export interface SearchResult {
    movies: {
        nodes: SearchMovie[];
        pagination: SearchPaginationDetails;
    }
}

export interface SearchMovie {
    id: string;
    title: string;
    posterUrl: string;
    summary: string;
    duration: string;
    rating: string;
    genres: Genre[];
}

export interface SearchPaginationDetails {
    page: number;
    perPage: number;
    totalPages: number;
}

export class SearchQuery {
    query: string;
    genre?: string;
    page?: number;
    perPage?: number;
}

export interface Genre {
    title: string;
}

export interface DetailResult {
    movie: Movie;
}

export interface Movie {
    id: string;
    title: string;
    posterUrl: string;
    summary: string;
    duration: string;
    directors: string[];
    mainActors: string[];
    datePublished: string;
    rating: string;
    ratingValue: number;
    bestRating: number;
    worstRating: number;
    writers: string[];
    genres: Genre[];
}