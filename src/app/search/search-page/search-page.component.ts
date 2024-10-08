import { Component } from '@angular/core';
import { SearchBoxComponent } from '../search-box/search-box.component';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { SearchPaginationComponent } from '../search-pagination/search-pagination.component';
import { WatchLaterComponent } from '../../list/watch-later/watch-later.component';

@Component({
  selector: 'search-page',
  standalone: true,
  imports: [ SearchBoxComponent, SearchResultsComponent, SearchPaginationComponent, WatchLaterComponent ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss'
})
export class SearchPageComponent {

}
