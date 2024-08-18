import { Component, inject } from '@angular/core';
import { BaseComponent } from '../../common/base';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from '../../search/search.service';
import { Movie } from '../../search/result.model';
import { DurationTimeStampPipe } from '../../duration-time-stamp.pipe';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [  CommonModule, DurationTimeStampPipe, DatePipe ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent extends BaseComponent {
  movieId: string | null;
  movie: Movie;

  constructor(private route: ActivatedRoute, private searchService: SearchService) {
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
  }
}
