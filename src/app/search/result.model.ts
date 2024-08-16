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