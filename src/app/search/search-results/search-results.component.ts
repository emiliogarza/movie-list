import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { BaseComponent } from '../../common/base';
import { SearchMovie } from '../result.model';
import { CommonModule } from '@angular/common';
import { DurationTimeStampPipe } from '../../duration-time-stamp.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'search-results',
  standalone: true,
  imports: [ CommonModule, DurationTimeStampPipe ],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent extends BaseComponent {
    movies: SearchMovie[];
    loading: boolean;

    constructor(private searchService: SearchService, private router: Router) {
      super();
    }
    ngOnInit() {
      this.subs.add(this.searchService.movieSearchResult.subscribe((results) => {
        this.movies = results.movies.nodes;
      }));
      this.subs.add(this.searchService.loadingSearch.subscribe(loading => this.loading = loading));
    }

    routeToDetails(movieId: string) {
      this.router.navigate(['/detail/' + movieId]);
    }
}
