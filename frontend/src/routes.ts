import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    title: 'Dashboard',
    loadComponent: () =>
      import('./app/components/dashboard/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
  },
  {
    path: 'systems',
    title: 'Impianti',
    loadComponent: () =>
      import('./app/components/systems/systems/systems.component').then(
        (c) => c.SystemsComponent
      ),
  },
  {
    path: 'systems/new',
    title: 'Nuovo Impianto',
    loadComponent: () =>
      import('./app/components/systems/new-system/new-system.component').then(
        (c) => c.NewSystemComponent
      ),
  },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // TODO: Redirect to '/login'
  { path: '**', redirectTo: '/dashboard' },
];
