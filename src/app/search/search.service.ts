import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  constructor(private apollo: Apollo) { }

  searchTitles(search: string): Observable<SearchResult | string> {
    return this.apollo
      .watchQuery<SearchResult>({
        query: SEARCH_MOVIES,
        variables: {
          "where": {
            "search": search,
            "genre": null
          },
          "pagination": {
            "page": null,
            "perPage": null
          }
        }
      })
      .valueChanges.pipe(
        take(1),
        map(({ data }) => data),
        catchError(this.handleError<string>('searchTitles', ''))
      );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log('operation:', operation);

      // send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
