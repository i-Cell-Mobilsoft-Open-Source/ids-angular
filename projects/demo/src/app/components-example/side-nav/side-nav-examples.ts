import { SideNavActiveIndicatorExampleComponent } from './side-nav-active-indicator-example/side-nav-active-indicator-example.component';
import { SideNavBasicExampleComponent } from './side-nav-basic-example/side-nav-basic-example.component';
import { SideNavDisabledExampleComponent } from './side-nav-disabled-example/side-nav-disabled-example.component';
import { SideNavIconOnlyExampleComponent } from './side-nav-icon-only-example/side-nav-icon-only-example.component';
import { SideNavIconsExampleComponent } from './side-nav-icons-example/side-nav-icons-example.component';
import { SideNavNestedExampleComponent } from './side-nav-nested-example/side-nav-nested-example.component';
import { SideNavSemanticExampleComponent } from './side-nav-semantic-example/side-nav-semantic-example.component';
import { SideNavSizesExampleComponent } from './side-nav-sizes-example/side-nav-sizes-example.component';
import { SideNavTrailingIconTooltipExampleComponent } from './side-nav-trailing-icon-tooltip-example/side-nav-trailing-icon-tooltip-example.component';
import { SideNavVariantsExampleComponent } from './side-nav-variants-example/side-nav-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SIDE_NAV_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'side-nav-basic',
    title: 'EXAMPLES.SIDE_NAV.BASIC.TITLE',
    description: 'EXAMPLES.SIDE_NAV.BASIC.DESCRIPTION',
    component: SideNavBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-basic-example/side-nav-basic-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-basic-example/side-nav-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-variants',
    title: 'EXAMPLES.SIDE_NAV.VARIANTS.TITLE',
    description: 'EXAMPLES.SIDE_NAV.VARIANTS.DESCRIPTION',
    component: SideNavVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-variants-example/side-nav-variants-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-variants-example/side-nav-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-sizes',
    title: 'EXAMPLES.SIDE_NAV.SIZES.TITLE',
    description: 'EXAMPLES.SIDE_NAV.SIZES.DESCRIPTION',
    component: SideNavSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-sizes-example/side-nav-sizes-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-sizes-example/side-nav-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-nested',
    title: 'EXAMPLES.SIDE_NAV.NESTED.TITLE',
    description: 'EXAMPLES.SIDE_NAV.NESTED.DESCRIPTION',
    component: SideNavNestedExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-nested-example/side-nav-nested-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-nested-example/side-nav-nested-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-icons',
    title: 'EXAMPLES.SIDE_NAV.ICONS.TITLE',
    description: 'EXAMPLES.SIDE_NAV.ICONS.DESCRIPTION',
    component: SideNavIconsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-icons-example/side-nav-icons-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-icons-example/side-nav-icons-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-trailing-icon-tooltip',
    title: 'EXAMPLES.SIDE_NAV.TRAILING_ICON_TOOLTIP.TITLE',
    description: 'EXAMPLES.SIDE_NAV.TRAILING_ICON_TOOLTIP.DESCRIPTION',
    component: SideNavTrailingIconTooltipExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-trailing-icon-tooltip-example/side-nav-trailing-icon-tooltip-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-trailing-icon-tooltip-example/side-nav-trailing-icon-tooltip-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-disabled',
    title: 'EXAMPLES.SIDE_NAV.DISABLED.TITLE',
    description: 'EXAMPLES.SIDE_NAV.DISABLED.DESCRIPTION',
    component: SideNavDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-disabled-example/side-nav-disabled-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-disabled-example/side-nav-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-active-indicator',
    title: 'EXAMPLES.SIDE_NAV.ACTIVE_INDICATOR.TITLE',
    description: 'EXAMPLES.SIDE_NAV.ACTIVE_INDICATOR.DESCRIPTION',
    component: SideNavActiveIndicatorExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-active-indicator-example/side-nav-active-indicator-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-active-indicator-example/side-nav-active-indicator-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-icon-only',
    title: 'EXAMPLES.SIDE_NAV.ICON_ONLY.TITLE',
    description: 'EXAMPLES.SIDE_NAV.ICON_ONLY.DESCRIPTION',
    component: SideNavIconOnlyExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-icon-only-example/side-nav-icon-only-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-icon-only-example/side-nav-icon-only-example.component.ts',
      },
    ],
  },
  {
    id: 'side-nav-semantic',
    title: 'EXAMPLES.SIDE_NAV.SEMANTIC.TITLE',
    description: 'EXAMPLES.SIDE_NAV.SEMANTIC.DESCRIPTION',
    component: SideNavSemanticExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-nav/side-nav-semantic-example/side-nav-semantic-example.component.html',
        TSpath: 'assets/examples/side-nav/side-nav-semantic-example/side-nav-semantic-example.component.ts',
      },
    ],
  },
];
