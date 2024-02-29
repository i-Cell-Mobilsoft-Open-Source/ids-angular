import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/avatar',
    loadComponent: () =>
      import('./pages/avatar/avatar.component').then(
        (m) => m.AvatarComponent
      ),
  },
  {
    path: 'components/buttons',
    loadComponent: () =>
      import('./pages/buttons/buttons.component').then(
        (m) => m.ButtonsComponent
      ),
  },
  {
    path: 'components/icon-button',
    loadComponent: () =>
      import('./pages/icon-button/icon-button.component').then(
        (m) => m.IconButtonComponent
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
