import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components/accordion',
    loadComponent: () => import('./pages/accordion/accordion-demo.component').then((module) => module.AccordionDemoComponent),
  },
  {
    path: 'components/action-menu',
    loadComponent: () => import('./pages/action-menu/action-menu-demo.component').then((module) => module.ActionMenuDemoComponent),
  },
  {
    path: 'components/action-panel',
    loadComponent: () => import('./pages/action-panel/action-panel-demo.component').then((module) => module.ActionPanelDemoComponent),
  },
  {
    path: 'components/avatar',
    loadComponent: () => import('./pages/avatar/avatar-demo.component').then((module) => module.AvatarDemoComponent),
  },
  {
    path: 'components/button',
    loadComponent: () => import('./pages/button/button-demo.component').then((module) => module.ButtonDemoComponent),
  },
  {
    path: 'components/card',
    loadComponent: () => import('./pages/card/card-demo.component').then((module) => module.CardDemoComponent),
  },
  {
    path: 'components/checkbox',
    loadComponent: () => import('./pages/checkbox/checkbox-demo.component').then((module) => module.CheckboxDemoComponent),
  },
  {
    path: 'components/dialog',
    loadComponent: () => import('./pages/dialog/dialog-demo.component').then((module) => module.DialogDemoComponent),
  },
  {
    path: 'components/divider',
    loadComponent: () => import('./pages/divider/divider-demo.component').then((module) => module.DividerDemoComponent),
  },
  {
    path: 'components/icon-button',
    loadComponent: () => import('./pages/icon-button/icon-button-demo.component').then((module) => module.IconButtonDemoComponent),
  },
  {
    path: 'components/paginator',
    loadComponent: () => import('./pages/paginator/paginator-demo.component').then((module) => module.PaginatorDemoComponent),
  },
  {
    path: 'components/tag',
    loadComponent: () => import('./pages/tag/tag-demo.component').then((module) => module.TagDemoComponent),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components/components.component').then((module) => module.ComponentsComponent),
  },
];
