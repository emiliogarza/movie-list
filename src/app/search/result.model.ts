export interface SearchResult {
    movies: {
        nodes: SearchMovie[];
        pagination: SearchPaginationDetails;
    }
}

export interface SearchMovie {
    id: string;
    title: string;
}

export interface SearchPaginationDetails {
    page: number;
    perPage: number;
    totalPages: number;
}