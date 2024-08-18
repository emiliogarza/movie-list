import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WatchListItem } from '../search/result.model';
import { Observable } from '@apollo/client/utilities';

@Injectable({
  providedIn: 'root'
})
export class WatchLaterService {
  public watchItems: Subject<WatchListItem[]>;

  constructor() {
    this.watchItems = new Subject();
  }

  storeWatchList(watchItems: WatchListItem[]) {
    localStorage.setItem("watchList", JSON.stringify(watchItems));
    this.watchItems.next(watchItems);
  }
}
