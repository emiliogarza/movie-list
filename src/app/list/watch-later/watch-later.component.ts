import { Component } from '@angular/core';
import { BaseComponent } from '../../common/base';
import { WatchLaterService } from '../watch-later.service';
import { CommonModule } from '@angular/common';
import { WatchListItem } from '../../search/result.model';
import { Router } from '@angular/router';

@Component({
  selector: 'watch-later',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './watch-later.component.html',
  styleUrl: './watch-later.component.scss'
})
export class WatchLaterComponent extends BaseComponent {
  open = false;
  watchList: WatchListItem[];

  constructor(private watchService: WatchLaterService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.watchService.watchItems.subscribe((watchList) => this.watchList = watchList);
    let watchString = localStorage.getItem("watchList");
    if (watchString) {
      this.watchList = JSON.parse(watchString)
    }
  }

  expand() {
    this.open = this.open ? false : true;
  }

  routeToDetails(movieId: string) {
    this.router.navigate(['/detail/' + movieId]);
  }
}
