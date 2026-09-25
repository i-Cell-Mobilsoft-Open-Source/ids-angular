import { MenuItemActiveIndicatorExampleComponent } from './menu-item-active-indicator-example/menu-item-active-indicator-example.component';
import { MenuItemAppearancesExampleComponent } from './menu-item-appearances-example/menu-item-appearances-example.component';
import { MenuItemBasicExampleComponent } from './menu-item-basic-example/menu-item-basic-example.component';
import { MenuItemDisabledExampleComponent } from './menu-item-disabled-example/menu-item-disabled-example.component';
import { MenuItemIconOnlyExampleComponent } from './menu-item-icon-only-example/menu-item-icon-only-example.component';
import { MenuItemIconsExampleComponent } from './menu-item-icons-example/menu-item-icons-example.component';
import { MenuItemLinkExampleComponent } from './menu-item-link-example/menu-item-link-example.component';
import { MenuItemSizesExampleComponent } from './menu-item-sizes-example/menu-item-sizes-example.component';
import { MenuItemVariantsExampleComponent } from './menu-item-variants-example/menu-item-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const MENU_ITEM_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'menu-item-basic',
    title: 'EXAMPLES.MENU_ITEM.BASIC.TITLE',
    description: 'EXAMPLES.MENU_ITEM.BASIC.DESCRIPTION',
    component: MenuItemBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-basic-example/menu-item-basic-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-basic-example/menu-item-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-link',
    title: 'EXAMPLES.MENU_ITEM.LINK.TITLE',
    description: 'EXAMPLES.MENU_ITEM.LINK.DESCRIPTION',
    component: MenuItemLinkExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-link-example/menu-item-link-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-link-example/menu-item-link-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-appearances',
    title: 'EXAMPLES.MENU_ITEM.APPEARANCES.TITLE',
    description: 'EXAMPLES.MENU_ITEM.APPEARANCES.DESCRIPTION',
    component: MenuItemAppearancesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-appearances-example/menu-item-appearances-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-appearances-example/menu-item-appearances-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-variants',
    title: 'EXAMPLES.MENU_ITEM.VARIANTS.TITLE',
    description: 'EXAMPLES.MENU_ITEM.VARIANTS.DESCRIPTION',
    component: MenuItemVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-variants-example/menu-item-variants-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-variants-example/menu-item-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-sizes',
    title: 'EXAMPLES.MENU_ITEM.SIZES.TITLE',
    description: 'EXAMPLES.MENU_ITEM.SIZES.DESCRIPTION',
    component: MenuItemSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-sizes-example/menu-item-sizes-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-sizes-example/menu-item-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-icons',
    title: 'EXAMPLES.MENU_ITEM.ICONS.TITLE',
    description: 'EXAMPLES.MENU_ITEM.ICONS.DESCRIPTION',
    component: MenuItemIconsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-icons-example/menu-item-icons-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-icons-example/menu-item-icons-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-disabled',
    title: 'EXAMPLES.MENU_ITEM.DISABLED.TITLE',
    description: 'EXAMPLES.MENU_ITEM.DISABLED.DESCRIPTION',
    component: MenuItemDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-disabled-example/menu-item-disabled-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-disabled-example/menu-item-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-icon-only',
    title: 'EXAMPLES.MENU_ITEM.ICON_ONLY.TITLE',
    description: 'EXAMPLES.MENU_ITEM.ICON_ONLY.DESCRIPTION',
    component: MenuItemIconOnlyExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-icon-only-example/menu-item-icon-only-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-icon-only-example/menu-item-icon-only-example.component.ts',
      },
    ],
  },
  {
    id: 'menu-item-active-indicator',
    title: 'EXAMPLES.MENU_ITEM.ACTIVE_INDICATOR.TITLE',
    description: 'EXAMPLES.MENU_ITEM.ACTIVE_INDICATOR.DESCRIPTION',
    component: MenuItemActiveIndicatorExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/menu-item/menu-item-active-indicator-example/menu-item-active-indicator-example.component.html',
        TSpath: 'assets/examples/menu-item/menu-item-active-indicator-example/menu-item-active-indicator-example.component.ts',
      },
    ],
  },
];
