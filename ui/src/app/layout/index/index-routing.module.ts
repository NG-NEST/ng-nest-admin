import { Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { AppRoutes } from 'src/app/app-routes';

export const IndexRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: AppRoutes
  }
];
