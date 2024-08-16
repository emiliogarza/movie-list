import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { catchError, map, finalize, take } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { SearchResult } from './result.model';

export const SEARCH_MOVIES = gql`
  query SearchMoviesQuery($pagination: PaginationInput, $where: MovieFilterInput) {
    movies(pagination: $pagination, where: $where) {
      nodes {
        id
        title,
        posterUrl,
        summary
      }
      pagination {
        page
        perPage
        totalPages
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  loadingSearch: Subject<boolean>;
  movieSearchResult: Subject<SearchResult>;

  constructor(private apollo: Apollo) {
    this.loadingSearch = new Subject();
    this.movieSearchResult = new Subject();
  }

  searchTitles(search: string, page?: number, perPage?: number): void {
    this.loadingSearch.next(true);
    this.apollo
      .watchQuery<SearchResult>({
        query: SEARCH_MOVIES,
        variables: {
          "where": {
            "search": search,
            "genre": null
          },
          "pagination": {
            "page": page,
            "perPage": perPage
          }
        }
      })
      .valueChanges.subscribe((searchResult) => {
        this.loadingSearch.next(false);
        this.movieSearchResult.next(searchResult.data);
      });
  }
}
