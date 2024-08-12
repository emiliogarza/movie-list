import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  subs = new Subscription();
  searchForm: FormGroup = this.fb.group({
    searchQuery: [null, Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private searchService: SearchService
  ) {}

  ngOnInit() {
  }
  
  onSearch() {
    let query = this.searchForm.controls['searchQuery'].value;
    if (query) {
      this.subs.add(
        this.searchService.searchTitles(query).subscribe(
          result => console.log(result),
          error => console.log(error)
        )
      )  
    }
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
