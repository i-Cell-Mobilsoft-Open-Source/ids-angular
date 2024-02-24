import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/buttons',
    loadComponent: () =>
      import('./pages/buttons/buttons.component').then(
        (m) => m.ButtonsComponent
      ),
  },
  {
    path: 'components',
    loadComponent: () =>
      import('./pages/components/components.component').then(
        (m) => m.ComponentsComponent
      ),
  },
];
