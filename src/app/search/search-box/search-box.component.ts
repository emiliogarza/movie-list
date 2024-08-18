import { Component } from '@angular/core';
import { SearchService } from '../search.service';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../common/base';
import { CommonModule } from '@angular/common';
import { SearchQuery } from '../result.model';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent extends BaseComponent {
  showFilters: boolean;
  queryObject: SearchQuery;
  genreOptions: Set<string>;
  
  searchForm: FormGroup = this.fb.group({
    searchQuery: [null, Validators.required],
    genre: [""]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private searchService: SearchService
  ) {
    super();
  }

  ngOnInit() {
    this.searchOnLoad();
    this.subs.add(
      this.searchService.movieSearchResult.subscribe((results) => {
        this.genreOptions = new Set();
        results.movies.nodes.forEach((movie) => {
          movie.genres.forEach(g => {
            this.genreOptions.add(g.title);
          })
        });
        this.showFilters = true;
      })
    );
    this.subs.add(
      this.searchService.query.subscribe(query => this.queryObject = query)
    );
  }
  
  onSearch() {
    let searchQuery = this.searchForm.controls['searchQuery'].value;
    let genre = this.searchForm.controls['genre'].value;
    if (searchQuery) {
      if (this.queryObject) {
        this.queryObject.query = searchQuery;
        this.queryObject.genre = genre;
        this.queryObject.page = 1;
      } else {
        this.queryObject = { 
          query: searchQuery, 
          genre: genre
        }
      }
      sessionStorage.setItem("searchQuery", JSON.stringify(this.queryObject));
      this.searchService.searchTitles(this.queryObject);
    }
  }

  searchOnLoad() {
    let query = sessionStorage.getItem("searchQuery");
    if (query) {
      let queryObject: SearchQuery = JSON.parse(query);
      this.mapToForm(queryObject);
      this.searchService.searchTitles(queryObject);
    }
  }

  mapToForm(queryObject: SearchQuery) {
    this.searchForm.controls['searchQuery'].setValue(queryObject.query);
    this.searchForm.controls['genre'].setValue(queryObject.genre);
  }
}
