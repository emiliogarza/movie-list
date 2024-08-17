import { Component } from '@angular/core';
import { BaseComponent } from '../../common/base';
import { SearchMovie, SearchPaginationDetails, SearchQuery } from '../result.model';
import { SearchService } from '../search.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'search-pagination',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './search-pagination.component.html',
  styleUrl: './search-pagination.component.scss'
})
export class SearchPaginationComponent extends BaseComponent {
  loading: boolean;
  movies: SearchMovie[];
  queryObject: SearchQuery;
  totalNumberOfResults: number;
  paginationDetails: SearchPaginationDetails;
  paginationButtons: number[] = [];
  paginationInActiveClasses = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0";
  paginationActiveClasses = "relative z-10 inline-flex items-center bg-cyan-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600";

  constructor(private searchService: SearchService) {
    super();
  }

  ngOnInit() {
    this.subs.add(this.searchService.movieSearchResult.subscribe((results) => {
      this.movies = results.movies.nodes;
      this.paginationDetails = results.movies.pagination;
      if (this.paginationDetails.page == 1) {
        this.calculateTotal();
        this.renderPaginationButtons(1);
      }
    }));
    this.subs.add(
      this.searchService.query.subscribe(query => this.queryObject = query)
    );
    this.subs.add(
      this.searchService.loadingSearch.subscribe(loading => this.loading = loading)
    );
  }

  renderPaginationButtons(startingPage: number): void {
    this.paginationButtons = [];
    for (let i = 0; i < 5; i++) {
      if (startingPage + i <= this.paginationDetails.totalPages) {
        this.paginationButtons.push(startingPage + i);
      }
    }
  }

  previousPage(): void {
    let firstButton = this.paginationButtons[0];
    let prevPage = this.paginationDetails.page - 1;
    let startingPage = this.paginationDetails.page - 5;
    if (prevPage > 0) {
      this.queryObject.page = prevPage;
      this.searchService.searchTitles(this.queryObject);
      if (this.paginationDetails.page === firstButton) {
        this.renderPaginationButtons(startingPage);
      }
    }
  }


  nextPage(): void {
    let lastButton = this.paginationButtons[this.paginationButtons.length - 1];
    let nextPage = this.paginationDetails.page + 1;
    if (nextPage <= this.paginationDetails.totalPages) {
      this.queryObject.page = nextPage;
      this.searchService.searchTitles(this.queryObject);
      if (this.paginationDetails.page === lastButton) {
        this.renderPaginationButtons(nextPage);
      }
    }
  }

  getClass(page: number): string {
    if (page === this.paginationDetails.page) {
      return this.paginationActiveClasses;
    } else {
      return this.paginationInActiveClasses;
    }
  }

  searchWithPagination(page: number): void {
    this.queryObject.page = page;
    this.searchService.searchTitles(this.queryObject);
  }

  calculateTotal(): void {
    this.totalNumberOfResults = this.movies.length * this.paginationDetails.totalPages;
  }
}
