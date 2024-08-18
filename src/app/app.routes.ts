import { Routes } from '@angular/router';
import { SearchPageComponent } from './search/search-page/search-page.component';
import { DetailsComponent } from './details/details/details.component';

export const routes: Routes = [
    {
        path: '',
        component: SearchPageComponent
    },
    {
        path: 'detail/:id',
        component: DetailsComponent
    }
];
