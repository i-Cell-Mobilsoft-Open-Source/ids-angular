import { AccordionDemoService } from './pages/accordion/accordion-demo.service';
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
import { MessageDemoService } from './pages/message/message-demo.service';
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

import { EnvironmentProviders, Provider, Type } from '@angular/core';
import { Routes, Route } from '@angular/router';

const DEMO_IMPORTS: Record<string, () => Promise<Type<unknown>>> = {
  'accordion': () => import('./pages/accordion/accordion-demo.component').then((module) => module.AccordionDemoComponent),
  'avatar': () => import('./pages/avatar/avatar-demo.component').then((module) => module.AvatarDemoComponent),
  'badge': () => import('./pages/badge/badge-demo.component').then((module) => module.BadgeDemoComponent),
  'breadcrumb': () => import('./pages/breadcrumb/breadcrumb-demo.component').then((module) => module.BreadcrumbDemoComponent),
  'button': () => import('./pages/button/button-demo.component').then((module) => module.ButtonDemoComponent),
  'card': () => import('./pages/card/card-demo.component').then((module) => module.CardDemoComponent),
  'checkbox': () => import('./pages/checkbox/checkbox-demo.component').then((module) => module.CheckboxDemoComponent),
  'chip': () => import('./pages/chip/chip-demo.component').then((module) => module.ChipDemoComponent),
  'date-picker': () => import('./pages/datepicker/datepicker-demo.component').then((module) => module.DatepickerDemoComponent),
  'dialog': () => import('./pages/dialog/dialog-demo.component').then((module) => module.DialogDemoComponent),
  'divider': () => import('./pages/divider/divider-demo.component').then((module) => module.DividerDemoComponent),
  'fieldset': () => import('./pages/fieldset/fieldset-demo.component').then((module) => module.FieldsetDemoComponent),
  'form-field': () => import('./pages/form-field/form-field-demo.component').then((module) => module.FormFieldDemoComponent),
  'icon': () => import('./pages/icon/icon-demo.component').then((module) => module.IconDemoComponent),
  'icon-button': () => import('./pages/icon-button/icon-button-demo.component').then((module) => module.IconButtonDemoComponent),
  'menu-item': () => import('./pages/menu-item/menu-item-demo.component').then((module) => module.MenuItemDemoComponent),
  'message': () => import('./pages/message/message-demo.component').then((module) => module.MessageDemoComponent),
  'notification': () => import('./pages/notification/notification-demo.component').then((module) => module.NotificationDemoComponent),
  'overlay-panel': () => import('./pages/overlay-panel/overlay-panel-demo.component').then((module) => module.OverlayPanelDemoComponent),
  'paginator': () => import('./pages/paginator/paginator-demo.component').then((module) => module.PaginatorDemoComponent),
  'radio': () => import('./pages/radio/radio-demo.component').then((module) => module.RadioDemoComponent),
  'scrollbar': () => import('./pages/scrollbar/scrollbar-demo.component').then((module) => module.ScrollbarDemoComponent),
  'segmented-control': () => import('./pages/segmented-control/segmented-control-demo.component')
    .then((module) => module.SegmentedControlDemoComponent),
  'segmented-control-toggle': () => import('./pages/segmented-control-toggle/segmented-control-toggle-demo.component')
    .then((module) => module.SegmentedControlToggleDemoComponent),
  'select': () => import('./pages/select/select-demo.component').then((module) => module.SelectDemoComponent),
  'side-nav': () => import('./pages/side-nav/side-nav-demo.component').then((module) => module.SideNavDemoComponent),
  'side-sheet': () => import('./pages/side-sheet/side-sheet-demo.component').then((module) => module.SideSheetDemoComponent),
  'snackbar': () => import('./pages/snackbar/snackbar-demo.component').then((module) => module.SnackbarDemoComponent),
  'spinner': () => import('./pages/spinner/spinner-demo.component').then((module) => module.SpinnerDemoComponent),
  'switch': () => import('./pages/switch/switch-demo.component').then((module) => module.SwitchDemoComponent),
  'tab': () => import('./pages/tab/tab-demo.component').then((module) => module.TabsDemoComponent),
  'table': () => import('./pages/table/table-demo.component').then((module) => module.TableDemoComponent),
  'tag': () => import('./pages/tag/tag-demo.component').then((module) => module.TagDemoComponent),
  'tooltip': () => import('./pages/tooltip/tooltip-demo.component').then((module) => module.TooltipDemoComponent),
};

function buildComponentRoute(
  slug: string,
  demoService: Provider | EnvironmentProviders,
): Route {
  const componentImport = DEMO_IMPORTS[slug];
  if (!componentImport) {
    throw new Error(`No component import found for slug: ${slug}`);
  }
  return {
    path: slug,
    component: ComponentDetailsComponent,
    providers: [demoService],
    children: [
      {
        path: '', redirectTo: 'demo', pathMatch: 'full',
      },
      {
        path: 'demo',
        loadComponent: componentImport,
      },
      {
        path: 'guidelines',
        loadComponent: () => import('./components/tabs/guidelines/guidelines.component').then((module) => module.GuidelinesComponent),
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
      buildComponentRoute('message', MessageDemoService),
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
