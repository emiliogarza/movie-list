import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from '../search.service';
import { FormGroup, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../../common/base';

@Component({
  selector: 'search-box',
  standalone: true,
  imports: [ ReactiveFormsModule ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  
  searchForm: FormGroup = this.fb.group({
    searchQuery: [null, Validators.required]
  })

  constructor(
    private fb: UntypedFormBuilder,
    private searchService: SearchService
  ) {}
  
  onSearch() {
    let query = this.searchForm.controls['searchQuery'].value;
    if (query) {
      this.searchService.searchTitles(query); 
    }
  }
}
