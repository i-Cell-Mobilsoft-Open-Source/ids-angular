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
import { SideNavDemoService } from './pages/side-nav/side-nav-demo.service';
import { SideSheetDemoService } from './pages/side-sheet/side-sheet-demo.service';
import { SnackbarDemoService } from './pages/snackbar/snackbar-demo.service';
import { SpinnerDemoService } from './pages/spinner/spinner-demo.service';
import { SwitchDemoService } from './pages/switch/switch-demo.service';
import { TabDemoService } from './pages/tab/tab-demo.service';
import { TableDemoService } from './pages/table/table-demo.service';
import { TagDemoService } from './pages/tag/tag-demo.service';
import { TooltipDemoService } from './pages/tooltip/tooltip-demo.service';

import { EnvironmentProviders, Provider } from '@angular/core';
import { Routes, Route } from '@angular/router';

function buildComponentRoute(
  slug: string,
  demoService: Provider | EnvironmentProviders,
): Route {
  return {
    path: slug,
    component: ComponentDetailsComponent,
    providers: [demoService],
    children: [
      {
        path: '', redirectTo: 'guidelines', pathMatch: 'full',
      },
      {
        path: 'guidelines',
        loadComponent: () => import('./components/tabs/guidelines/guidelines.component').then((module) => module.GuidelinesComponent),
      },
      {
        path: 'demo',
        loadComponent: () => import('./components/tabs/demo-and-code/demo-and-code.component')
          .then((module) => module.DemoAndCodeComponent),
      },
      {
        path: 'api',
        loadComponent: () => import('./components/tabs/api/api.component').then((module) => module.ApiComponent),
      },
    ],
  };
}

export const routes: Routes = [
  {
    path: 'components',
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/components/components.component').then((module) => module.ComponentsComponent),
      },

      buildComponentRoute('accordion', AccordionDemoService),
      buildComponentRoute('action-menu', ActionMenuDemoService),
      buildComponentRoute('avatar', AvatarDemoService),
      buildComponentRoute('badge', BadgeDemoService),
      buildComponentRoute('breadcrumb', BreadcrumbDemoService),
      buildComponentRoute('button', ButtonDemoService),
      buildComponentRoute('card', CardDemoService),
      buildComponentRoute('checkbox', CheckboxDemoService),
      buildComponentRoute('chip', ChipDemoService),
      buildComponentRoute('date-picker', DatepickerDemoService),
      buildComponentRoute('dialog', DialogDemoService),
      buildComponentRoute('divider', DividerDemoService),
      buildComponentRoute('fieldset', FieldsetDemoService),
      buildComponentRoute('form-field', FormFieldDemoService),
      buildComponentRoute('icon', IconDemoService),
      buildComponentRoute('icon-button', IconButtonDemoService),
      buildComponentRoute('menu-item', MenuItemDemoService),
      buildComponentRoute('notification', NotificationDemoService),
      buildComponentRoute('overlay-panel', OverlayPanelDemoService),
      buildComponentRoute('paginator', PaginatorDemoService),
      buildComponentRoute('radio', RadioDemoService),
      buildComponentRoute('scrollbar', ScrollbarDemoService),
      buildComponentRoute('segmented-control', SegmentedControlDemoService),
      buildComponentRoute('segmented-control-toggle', SegmentedControlToggleDemoService),
      buildComponentRoute('select', SelectDemoService),
      buildComponentRoute('side-nav', SideNavDemoService),
      buildComponentRoute('side-sheet', SideSheetDemoService),
      buildComponentRoute('snackbar', SnackbarDemoService),
      buildComponentRoute('spinner', SpinnerDemoService),
      buildComponentRoute('switch', SwitchDemoService),
      buildComponentRoute('tab', TabDemoService),
      buildComponentRoute('table', TableDemoService),
      buildComponentRoute('tag', TagDemoService),
      buildComponentRoute('tooltip', TooltipDemoService),
    ],
  },
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
