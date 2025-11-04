import { AccordionDemoService } from './pages/accordion/accordion-demo.service';
import { ActionMenuDemoService } from './pages/action-menu/action-menu-demo.service';
import { AvatarDemoService } from './pages/avatar/avatar-demo.service';
import { BadgeDemoService } from './pages/badge/badge-demo.service';
import { BreadcrumbDemoService } from './pages/breadcrumb/breadcrumb-demo.service';
import { ButtonDemoService } from './pages/button/button-demo.service';
import { CardDemoService } from './pages/card/card-demo.service';
import { CheckboxDemoService } from './pages/checkbox/checkbox-demo.service';
import { ChipDemoService } from './pages/chip/chip-demo.service';
import { ComponentDetailsComponent } from './pages/components/component-details/component-details.component';
import { DatepickerDemoService } from './pages/datepicker/datepicker-demo.service';
import { DialogDemoService } from './pages/dialog/dialog-demo.service';
import { DividerDemoService } from './pages/divider/divider-demo.service';
import { FieldsetDemoService } from './pages/fieldset/fieldset-demo.service';
import { FormFieldDemoService } from './pages/form-field/form-field-demo.service';
import { IconDemoService } from './pages/icon/icon-demo.service';
import { IconButtonDemoService } from './pages/icon-button/icon-button-demo.service';
import { MenuItemDemoService } from './pages/menu-item/menu-item-demo.service';
import { NotificationDemoService } from './pages/notification/notification-demo.service';
import { OverlayPanelDemoService } from './pages/overlay-panel/overlay-panel-demo.service';
import { PaginatorDemoService } from './pages/paginator/paginator-demo.service';
import { RadioDemoService } from './pages/radio/radio-demo.service';
import { ScrollbarDemoService } from './pages/scrollbar/scrollbar-demo.service';
import { SegmentedControlDemoService } from './pages/segmented-control/segmented-control-demo.service';
import { SegmentedControlToggleDemoService } from './pages/segmented-control-toggle/segmented-control-toggle-demo.service';
import { SelectDemoService } from './pages/select/select-demo.service';
import { SideSheetDemoService } from './pages/side-sheet/side-sheet-demo.service';
import { SnackbarDemoService } from './pages/snackbar/snackbar-demo.service';
import { SpinnerDemoService } from './pages/spinner/spinner-demo.service';
import { SwitchDemoService } from './pages/switch/switch-demo.service';

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
              import('./pages/accordion/accordion-demo-control.component').then((module) => module.AccordionDemoControlComponent),
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
              import('./pages/action-menu/action-menu-demo-control.component').then((module) => module.ActionMenuDemoControlComponent),
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
            loadComponent: () => import('./pages/avatar/avatar-demo-control.component').then((module) => module.AvatarDemoControlComponent),
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
            loadComponent: () => import('./pages/badge/badge-demo-control.component').then((module) => module.BadgeDemoControlComponent),
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
            loadComponent: () => import('./pages/button/button-demo-control.component').then((module) => module.ButtonDemoControlComponent),
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
            loadComponent: () => import('./pages/card/card-demo-control.component').then((module) => module.CardDemoControlComponent),
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
        providers: [ChipDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/chip/chip-demo.component').then((module) => module.ChipDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () => import('./pages/chip/chip-demo-control.component').then((module) => module.ChipDemoControlComponent),
          },
        ],
      },
      {
        path: 'date-picker',
        component: ComponentDetailsComponent,
        providers: [DatepickerDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/datepicker/datepicker-demo.component').then((module) => module.DatepickerDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/datepicker/datepicker-demo-control.component').then((module) => module.DatepickerDemoControlComponent),
          },
        ],
      },
      {
        path: 'dialog',
        component: ComponentDetailsComponent,
        providers: [DialogDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/dialog/dialog-demo.component').then((module) => module.DialogDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () => import('./pages/dialog/dialog-demo-control.component').then((module) => module.DialogDemoControlComponent),
          },
        ],
      },
      {
        path: 'divider',
        component: ComponentDetailsComponent,
        providers: [DividerDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/divider/divider-demo.component').then((module) => module.DividerDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/divider/divider-demo-control.component').then((module) => module.DividerDemoControlComponent),
          },
        ],
      },
      {
        path: 'fieldset',
        component: ComponentDetailsComponent,
        providers: [FieldsetDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/fieldset/fieldset-demo.component').then((module) => module.FieldsetDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/fieldset/fieldset-demo-control.component').then((modu) => modu.FieldsetDemoControlComponent),
          },
        ],
      },
      {
        path: 'form-field',
        component: ComponentDetailsComponent,
        providers: [FormFieldDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/form-field/form-field-demo.component').then((module) => module.FormFieldDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/form-field/form-field-demo-control.component').then((mod) => mod.FormFieldDemoControlComponent),
          },
        ],
      },
      {
        path: 'icon',
        component: ComponentDetailsComponent,
        providers: [IconDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/icon/icon-demo.component').then((module) => module.IconDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/icon/icon-demo-control.component').then((module) => module.IconDemoControlComponent),
          },
        ],
      },
      {
        path: 'icon-button',
        component: ComponentDetailsComponent,
        providers: [IconButtonDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/icon-button/icon-button-demo.component').then((module) => module.IconButtonDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/icon-button/icon-button-demo-control.component').then((module) => module.IconButtonDemoControlComponent),
          },
        ],
      },
      {
        path: 'menu-item',
        component: ComponentDetailsComponent,
        providers: [MenuItemDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/menu-item/menu-item-demo.component').then((module) => module.MenuItemDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/menu-item/menu-item-demo-control.component').then((module) => module.MenuItemDemoControlComponent),
          },
        ],
      },
      {
        path: 'notification',
        component: ComponentDetailsComponent,
        providers: [NotificationDemoService],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/notification/notification-demo.component').then((module) => module.NotificationDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/notification/notification-demo-control.component').then(
                (module) => module.NotificationDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'overlay-panel',
        component: ComponentDetailsComponent,
        providers: [OverlayPanelDemoService],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/overlay-panel/overlay-panel-demo.component').then((module) => module.OverlayPanelDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/overlay-panel/overlay-panel-demo-control.component').then(
                (module) => module.OverlayPanelDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'paginator',
        component: ComponentDetailsComponent,
        providers: [PaginatorDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/paginator/paginator-demo.component').then((module) => module.PaginatorDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/paginator/paginator-demo-control.component').then(
                (module) => module.PaginatorDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'radio',
        component: ComponentDetailsComponent,
        providers: [RadioDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/radio/radio-demo.component').then((module) => module.RadioDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/radio/radio-demo-control.component').then((module) => module.RadioDemoControlComponent),
          },
        ],
      },
      {
        path: 'scrollbar',
        component: ComponentDetailsComponent,
        providers: [ScrollbarDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/scrollbar/scrollbar-demo.component').then((module) => module.ScrollbarDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/scrollbar/scrollbar-demo-control.component').then((module) => module.ScrollbarDemoControlComponent),
          },
        ],
      },
      {
        path: 'segmented-control',
        component: ComponentDetailsComponent,
        providers: [SegmentedControlDemoService],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/segmented-control/segmented-control-demo.component').then((module) => module.SegmentedControlDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/segmented-control/segmented-control-demo-control.component').then(
                (module) => module.SegmentedControlDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'segmented-control-toggle',
        component: ComponentDetailsComponent,
        providers: [SegmentedControlToggleDemoService],
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/segmented-control-toggle/segmented-control-toggle-demo.component').then(
                (module) => module.SegmentedControlToggleDemoComponent,
              ),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/segmented-control-toggle/segmented-control-toggle-demo-control.component').then(
                (module) => module.SegmentedControlToggleDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'select',
        component: ComponentDetailsComponent,
        providers: [SelectDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/select/select-demo.component').then((module) => module.SelectDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/select/select-demo-control.component').then((module) => module.SelectDemoControlComponent),
          },
        ],
      },
      {
        path: 'side-sheet',
        component: ComponentDetailsComponent,
        providers: [SideSheetDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/side-sheet/side-sheet-demo.component').then((module) => module.SideSheetDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/side-sheet/side-sheet-demo-control.component').then(
                (module) => module.SideSheetDemoControlControlComponent,
              ),
          },
        ],
      },
      {
        path: 'snackbar',
        component: ComponentDetailsComponent,
        providers: [SnackbarDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/snackbar/snackbar-demo.component').then((module) => module.SnackbarDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/snackbar/snackbar-demo-control.component').then(
                (module) => module.SnackbarDemoControlComponent,
              ),
          },
        ],
      },
      {
        path: 'spinner',
        component: ComponentDetailsComponent,
        providers: [SpinnerDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/spinner/spinner-demo.component').then((module) => module.SpinnerDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/spinner/spinner-demo-control.component').then((module) => module.SpinnerDemoControlComponent),
          },
        ],
      },
      {
        path: 'switch',
        component: ComponentDetailsComponent,
        providers: [SwitchDemoService],
        children: [
          {
            path: '',
            loadComponent: () => import('./pages/switch/switch-demo.component').then((module) => module.SwitchDemoComponent),
          },
          {
            path: '',
            outlet: 'demoControls',
            loadComponent: () =>
              import('./pages/switch/switch-demo-control.component').then((module) => module.SwitchDemoControlComponent),
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
