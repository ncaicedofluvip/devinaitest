import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report').then(m => m.ReportComponent)
  }
];
