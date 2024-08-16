import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { BaseComponent } from '../../common/base';
import { SearchMovie, SearchPaginationDetails, SearchResult } from '../result.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'search-results',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent extends BaseComponent {
    paginationDetails: SearchPaginationDetails;
    movies: SearchMovie[];
    loading: boolean;

    constructor(private searchService: SearchService) {
      super();
    }
    ngOnInit() {
      this.subs.add(this.searchService.movieSearchResult.subscribe((results) => {
        this.paginationDetails = results.movies.pagination;
        this.movies = results.movies.nodes;
      }));
      this.subs.add(this.searchService.loadingSearch.subscribe(loading => this.loading = loading));
    }
}
