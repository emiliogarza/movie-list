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