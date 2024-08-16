import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo, gql } from 'apollo-angular';
import { SearchQuery, SearchResult } from './result.model';

export const SEARCH_MOVIES = gql`
  query SearchMoviesQuery($pagination: PaginationInput, $where: MovieFilterInput) {
    movies(pagination: $pagination, where: $where) {
      nodes {
        id
        title,
        posterUrl,
        summary,
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

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  public query: Subject<SearchQuery>;
  public loadingSearch: Subject<boolean>;
  public movieSearchResult: Subject<SearchResult>;

  constructor(private apollo: Apollo) {
    this.query = new Subject();
    this.loadingSearch = new Subject();
    this.movieSearchResult = new Subject();
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
}
