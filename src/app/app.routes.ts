import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./views/management-view/management-view').then(m => m.ManagementViewComponent),
  }
];
