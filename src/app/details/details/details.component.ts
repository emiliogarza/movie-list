import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../common/base';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../search/search.service';
import { Movie, WatchListItem } from '../../search/result.model';
import { DurationTimeStampPipe } from '../../duration-time-stamp.pipe';
import { CommonModule, DatePipe } from '@angular/common';
import { WatchLaterComponent } from '../../list/watch-later/watch-later.component';
import { WatchLaterService } from '../../list/watch-later.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [  CommonModule, DurationTimeStampPipe, DatePipe, WatchLaterComponent ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends BaseComponent {
  movieId: string | null;
  movie: Movie;
  inWatchLater = false;
  watchList: WatchListItem[] = [];

  constructor(private route: ActivatedRoute, private searchService: SearchService, private watchService: WatchLaterService) {
    super();
  }

  ngOnInit() {
    this.subs.add(this.route.paramMap.subscribe((params) => {
      this.movieId = params.get('id');
      if (this.movieId) {
        this.searchService.searchMovieDetail(this.movieId);
      }
    }));
    this.subs.add(this.searchService.movieDetailResult.subscribe(movieData => {
      this.movie = movieData.movie;
    }));
    this.subs.add(this.watchService.watchItems.subscribe((watchList) => {
      this.watchList = watchList;
      this.inWatchLater = watchList.some(watchItem => watchItem.id === this.movieId);
    }));
    let watchString = localStorage.getItem("watchList");
    if (watchString) {
      this.watchList = JSON.parse(watchString);
      this.inWatchLater = this.watchList.some(watchItem => watchItem.id === this.movieId);
    }
  }

  addToWatchLater() {
    this.watchList.push({
      title: this.movie.title,
      id: this.movie.id
    });
    this.watchService.storeWatchList(this.watchList);
  }

  removeFromWatchLater() {
    let filteredList = this.watchList.filter(watchItem => watchItem.id !== this.movie.id);
    this.watchService.storeWatchList(filteredList);
  }
}
