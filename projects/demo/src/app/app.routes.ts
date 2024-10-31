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
    path: 'components/chip',
    loadComponent: () => import('./pages/chip/chip-demo.component').then((module) => module.ChipDemoComponent),
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
    path: 'components/fieldset',
    loadComponent: () => import('./pages/fieldset/fieldset-demo.component').then((module) => module.FieldsetDemoComponent),
  },
  {
    path: 'components/form-field',
    loadComponent: () => import('./pages/form-field/form-field-demo.component').then((module) => module.FormFieldDemoComponent),
  },
  {
    path: 'components/icon',
    loadComponent: () => import('./pages/icon/icon-demo.component').then((module) => module.IconDemoComponent),
  },
  {
    path: 'components/icon-button',
    loadComponent: () => import('./pages/icon-button/icon-button-demo.component').then((module) => module.IconButtonDemoComponent),
  },
  {
    path: 'components/overlay-panel',
    loadComponent: () => import('./pages/overlay-panel/overlay-panel-demo.component').then((module) => module.OverlayPanelDemoComponent),
  },
  {
    path: 'components/paginator',
    loadComponent: () => import('./pages/paginator/paginator-demo.component').then((module) => module.PaginatorDemoComponent),
  },
  {
    path: 'components/radio',
    loadComponent: () => import('./pages/radio/radio-demo.component').then((module) => module.RadioDemoComponent),
  },
  {
    path: 'components/segmented-control',
    loadComponent: () => import('./pages/segmented-control/segmented-control-demo.component').then(
      (module) => module.SegmentedControlDemoComponent),
  },
  {
    path: 'components/segmented-control-toggle',
    loadComponent: () => import('./pages/segmented-control-toggle/segmented-control-toggle-demo.component').then(
      (module) => module.SegmentedControlToggleDemoComponent),
  },
  {
    path: 'components/select',
    loadComponent: () => import('./pages/select/select-demo.component').then((module) => module.SelectDemoComponent),
  },
  {
    path: 'components/snackbar',
    loadComponent: () => import('./pages/snackbar/snackbar-demo.component').then((module) => module.SnackbarDemoComponent),
  },
  {
    path: 'components/switch',
    loadComponent: () => import('./pages/switch/switch-demo.component').then((module) => module.SwitchDemoComponent),
  },
  {
    path: 'components/tag',
    loadComponent: () => import('./pages/tag/tag-demo.component').then((module) => module.TagDemoComponent),
  },
  {
    path: 'components/tooltip',
    loadComponent: () => import('./pages/tooltip/tooltip-demo.component').then((module) => module.TooltipDemoComponent),
  },
  {
    path: 'components',
    loadComponent: () => import('./pages/components/components.component').then((module) => module.ComponentsComponent),
  },
];
