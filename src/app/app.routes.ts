import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.HomeComponent)
  },
  {
    path: 'report',
    loadComponent: () => import('./pages/report/report').then(m => m.ReportComponent)
  },
  {
    path: 'features',
    loadComponent: () => import('./pages/features/features').then(m => m.FeaturesComponent)
  },
  {
    path: 'for-managers',
    loadComponent: () => import('./pages/for-managers/for-managers').then(m => m.ForManagersComponent)
  },
  {
    path: 'free-tools',
    loadComponent: () => import('./pages/free-tools/free-tools').then(m => m.FreeToolsComponent)
  },
  {
    path: 'affiliate',
    loadComponent: () => import('./pages/affiliate/affiliate').then(m => m.AffiliateComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing').then(m => m.PricingComponent)
  }
];
