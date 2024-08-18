import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { DetailResult, SearchQuery, SearchResult } from './result.model';

export const SEARCH_MOVIES = gql`
  query SearchMoviesQuery($pagination: PaginationInput, $where: MovieFilterInput) {
    movies(pagination: $pagination, where: $where) {
      nodes {
        id
        title,
        posterUrl,
        summary,
        duration,
        rating,
        genres {
          title
        }
      }
      pagination {
        page
        perPage
        totalPages
      }
    }
  }
`;

export const MOVIE_DETAIL = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      id
      title
      posterUrl
      summary
      duration
      directors
      mainActors
      datePublished
      rating
      ratingValue
      bestRating
      worstRating
      writers
      genres {
        title
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  // Text Search
  public query: Subject<SearchQuery>;
  public loadingSearch: Subject<boolean>;
  public movieSearchResult: Subject<SearchResult>;

  // Detail Page
  public loadingDetail: Subject<boolean>;
  public movieDetailResult: Subject<DetailResult>;

  constructor(private apollo: Apollo) {
    this.query = new Subject();
    this.loadingSearch = new Subject();
    this.movieSearchResult = new Subject();
    this.loadingDetail = new Subject();
    this.movieDetailResult = new Subject();
  }

  searchTitles(searchQuery: SearchQuery): void {
    this.loadingSearch.next(true);
    this.apollo
      .watchQuery<SearchResult>({
        query: SEARCH_MOVIES,
        variables: {
          "where": {
            "search": searchQuery.query,
            "genre": searchQuery.genre
          },
          "pagination": {
            "page": searchQuery.page,
            "perPage": searchQuery.perPage
          }
        }
      })
      .valueChanges.subscribe((searchResult) => {
        this.query.next(searchQuery);
        this.loadingSearch.next(false);
        this.movieSearchResult.next(searchResult.data);
      });
  }

  searchMovieDetail(movieId: string): void {
    this.loadingDetail.next(true);
    this.apollo
      .watchQuery<DetailResult>({
        query: MOVIE_DETAIL,
        variables: {
          "movieId": movieId
        }
      })
      .valueChanges.subscribe((searchResult) => {
        this.loadingDetail.next(false);
        this.movieDetailResult.next(searchResult.data);
      });
  }
}
