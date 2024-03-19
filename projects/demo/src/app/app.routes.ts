import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/action-panel',
    loadComponent: () => import('./pages/action-panel/action-panel-demo.component').then((m) => m.ActionPanelDemoComponent),
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./pages/avatar/avatar-demo.component').then((m) => m.AvatarDemoComponent),
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/button/button-demo.component').then((m) => m.ButtonDemoComponent),
  },
  {
    path: 'components/divider',
    loadComponent: () => import('./pages/divider/divider-demo.component').then((m) => m.DividerDemoComponent),
  },
  {
    path: 'components/icon-button',
    loadComponent: () => import('./pages/icon-button/icon-button-demo.component').then((m) => m.IconButtonDemoComponent),
  },
  {
    path: 'components/tag',
    loadComponent: () => import('./pages/tag/tag-demo.component').then((m) => m.TagDemoComponent),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components/components.component').then((m) => m.ComponentsComponent),
  },
];
