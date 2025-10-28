import { AccordionDemoService } from './pages/accordion/accordion-demo.service';
import { ActionMenuDemoService } from './pages/action-menu/action-menu-demo.service';
import { AvatarDemoService } from './pages/avatar/avatar-demo.service';
import { BadgeDemoService } from './pages/badge/badge-demo.service';
import { BreadcrumbDemoService } from './pages/breadcrumb/breadcrumb-demo.service';
import { ButtonDemoService } from './pages/button/button-demo.service';
import { CardDemoService } from './pages/card/card-demo.service';
import { CheckboxDemoService } from './pages/checkbox/checkbox-demo.service';
import { ComponentDetailsComponent } from './pages/components/component-details/component-details.component';

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/components/components.component').then((module) => module.ComponentsComponent),
        // pathMatch: 'full',
      },

      {
        path: 'accordion',
        component: ComponentDetailsComponent,
        providers: [AccordionDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/accordion/accordion-demo.component').then((module) => module.AccordionDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/accordion/accordion-demo-control.component')
                .then((module) => module.AccordionDemoControlComponent),
          },
        ],
      },
      {
        path: 'action-menu',
        component: ComponentDetailsComponent,
        providers: [ActionMenuDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/action-menu/action-menu-demo.component').then((module) => module.ActionMenuDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/action-menu/action-menu-demo-control.component')
                .then((module) => module.ActionMenuDemoControlComponent),
          },
        ],
      },
      {
        path: 'avatar',
        component: ComponentDetailsComponent,
        providers: [AvatarDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/avatar/avatar-demo.component').then((module) => module.AvatarDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/avatar/avatar-demo-control.component').then((module) => module.AvatarDemoControlComponent),
          },
        ],
      },
      {
        path: 'badge',
        component: ComponentDetailsComponent,
        providers: [BadgeDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/badge/badge-demo.component').then((module) => module.BadgeDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/badge/badge-demo-control.component').then((module) => module.BadgeDemoControlComponent),
          },
        ],
      },
      {
        path: 'breadcrumb',
        component: ComponentDetailsComponent,
        providers: [BreadcrumbDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/breadcrumb/breadcrumb-demo.component').then((module) => module.BreadcrumbDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/breadcrumb/breadcrumb-demo-control.component').then((module) => module.BreadcrumbDemoControlComponent),
          },
        ],
      },
      {
        path: 'button',
        component: ComponentDetailsComponent,
        providers: [ButtonDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/button/button-demo.component').then((module) => module.ButtonDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/button/button-demo-control.component').then((module) => module.ButtonDemoControlComponent),
          },
        ],
      },
      {
        path: 'card',
        component: ComponentDetailsComponent,
        providers: [CardDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/card/card-demo.component').then((module) => module.CardDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/card/card-demo-control.component').then((module) => module.CardDemoControlComponent),
          },
        ],
      },
      {
        path: 'checkbox',
        component: ComponentDetailsComponent,
        providers: [CheckboxDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/checkbox/checkbox-demo.component').then((module) => module.CheckboxDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/checkbox/checkbox-demo-control.component').then((module) => module.CheckboxDemoControlComponent),
          },
        ],
      },
      {
        path: 'chip',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/chip/chip-demo.component').then((module) => module.ChipDemoComponent),
          },
        ],
      },
      {
        path: 'date-picker',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/datepicker/datepicker-demo.component').then((module) => module.DatepickerDemoComponent),
          },
        ],
      },
      {
        path: 'dialog',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/dialog/dialog-demo.component').then((module) => module.DialogDemoComponent),
          },
        ],
      },
      {
        path: 'divider',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/divider/divider-demo.component').then((module) => module.DividerDemoComponent),
          },
        ],
      },
      {
        path: 'fieldset',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/fieldset/fieldset-demo.component').then((module) => module.FieldsetDemoComponent),
          },
        ],
      },
      {
        path: 'form-field',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/form-field/form-field-demo.component').then((module) => module.FormFieldDemoComponent),
          },
        ],
      },
      {
        path: 'icon',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/icon/icon-demo.component').then((module) => module.IconDemoComponent),
          },
        ],
      },
      {
        path: 'icon-button',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/icon-button/icon-button-demo.component').then((module) => module.IconButtonDemoComponent),
          },
        ],
      },
      {
        path: 'menu-item',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/menu-item/menu-item-demo.component').then((module) => module.MenuItemDemoComponent),
          },
        ],
      },
      {
        path: 'notification',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/notification/notification-demo.component').then((module) => module.NotificationDemoComponent),
          },
        ],
      },
      {
        path: 'overlay-panel',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/overlay-panel/overlay-panel-demo.component').then((module) => module.OverlayPanelDemoComponent),
          },
        ],
      },
      {
        path: 'paginator',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/paginator/paginator-demo.component').then((module) => module.PaginatorDemoComponent),
          },
        ],
      },
      {
        path: 'radio',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/radio/radio-demo.component').then((module) => module.RadioDemoComponent),
          },
        ],
      },
      {
        path: 'scrollbar',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/scrollbar/scrollbar-demo.component').then((module) => module.ScrollbarDemoComponent),
          },
        ],
      },
      {
        path: 'segmented-control',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/segmented-control/segmented-control-demo.component').then((module) => module.SegmentedControlDemoComponent),
          },
        ],
      },
      {
        path: 'segmented-control-toggle',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/segmented-control-toggle/segmented-control-toggle-demo.component').then(
                (module) => module.SegmentedControlToggleDemoComponent,
              ),
          },
        ],
      },
      {
        path: 'select',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/select/select-demo.component').then((module) => module.SelectDemoComponent),
          },
        ],
      },
      {
        path: 'side-sheet',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/side-sheet/side-sheet-demo.component').then((module) => module.SideSheetDemoComponent),
          },
        ],
      },
      {
        path: 'snackbar',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/snackbar/snackbar-demo.component').then((module) => module.SnackbarDemoComponent),
          },
        ],
      },
      {
        path: 'spinner',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/spinner/spinner-demo.component').then((module) => module.SpinnerDemoComponent),
          },
        ],
      },
      {
        path: 'switch',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/switch/switch-demo.component').then((module) => module.SwitchDemoComponent),
          },
        ],
      },
      {
        path: 'tab',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/tab/tab-demo.component').then((module) => module.TabsDemoComponent),
          },
        ],
      },
      {
        path: 'table',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/table/table-demo.component').then((module) => module.TableDemoComponent),
          },
        ],
      },
      {
        path: 'tag',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/tag/tag-demo.component').then((module) => module.TagDemoComponent),
          },
        ],
      },
      {
        path: 'tooltip',
        component: ComponentDetailsComponent,
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/tooltip/tooltip-demo.component').then((module) => module.TooltipDemoComponent),
          },
        ],
      },
    ],
  },
  // {
  //   path: 'components/:slug',
  //   component: ComponentDetailsComponent,
  // },
  // {
  //   path: 'components/component-details',
  //   component: ComponentDetailsComponent,
  // },

  {
    path: 'index',
    loadComponent: () => import('./pages/index/index.component').then((module) => module.IndexComponent),
  },
  {
    path: 'issue-report',
    loadComponent: () => import('./pages/issue-report/issue-report.component').then((module) => module.IssueReportComponent),
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full',
  },
];
