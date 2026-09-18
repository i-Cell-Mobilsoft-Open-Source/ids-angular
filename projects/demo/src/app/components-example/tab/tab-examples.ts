import { TabAlignmentExampleComponent } from './tab-alignment-example/tab-alignment-example.component';
import { TabIndicatorPositionExampleComponent } from './tab-indicator-position-example/tab-indicator-position-example.component';
import { TabItemPropertiesExampleComponent } from './tab-item-properties-example/tab-item-properties-example.component';
import { TabOrientationExampleComponent } from './tab-orientation-example/tab-orientation-example.component';
import { TabPositionExampleComponent } from './tab-position-example/tab-position-example.component';
import { TabPrefixSuffixExampleComponent } from './tab-prefix-suffix-example/tab-prefix-suffix-example.component';
import { TabSizesExampleComponent } from './tab-sizes-example/tab-sizes-example.component';
import { TabStretchTabsExampleComponent } from './tab-stretch-tabs-example/tab-stretch-tabs-example.component';
import { TabVariantsExampleComponent } from './tab-variants-example/tab-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const samplesFolder = 'assets/examples/tab';

export const TAB_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'tab-sizes',
    title: 'EXAMPLES.TAB.SIZES.TITLE',
    description: 'EXAMPLES.TAB.SIZES.DESCRIPTION',
    component: TabSizesExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-sizes-example/tab-sizes-example.component.html`,
        TSpath: `${samplesFolder}/tab-sizes-example/tab-sizes-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-variants',
    title: 'EXAMPLES.TAB.VARIANTS.TITLE',
    description: 'EXAMPLES.TAB.VARIANTS.DESCRIPTION',
    component: TabVariantsExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-variants-example/tab-variants-example.component.html`,
        TSpath: `${samplesFolder}/tab-variants-example/tab-variants-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-orientation',
    title: 'EXAMPLES.TAB.ORIENTATION.TITLE',
    description: 'EXAMPLES.TAB.ORIENTATION.DESCRIPTION',
    component: TabOrientationExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-orientation-example/tab-orientation-example.component.html`,
        TSpath: `${samplesFolder}/tab-orientation-example/tab-orientation-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-alignment',
    title: 'EXAMPLES.TAB.ALIGNMENT.TITLE',
    description: 'EXAMPLES.TAB.ALIGNMENT.DESCRIPTION',
    component: TabAlignmentExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-alignment-example/tab-alignment-example.component.html`,
        TSpath: `${samplesFolder}/tab-alignment-example/tab-alignment-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-position',
    title: 'EXAMPLES.TAB.POSITION.TITLE',
    description: 'EXAMPLES.TAB.POSITION.DESCRIPTION',
    component: TabPositionExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-position-example/tab-position-example.component.html`,
        TSpath: `${samplesFolder}/tab-position-example/tab-position-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-indicator-position',
    title: 'EXAMPLES.TAB.INDICATOR_POSITION.TITLE',
    description: 'EXAMPLES.TAB.INDICATOR_POSITION.DESCRIPTION',
    component: TabIndicatorPositionExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-indicator-position-example/tab-indicator-position-example.component.html`,
        TSpath: `${samplesFolder}/tab-indicator-position-example/tab-indicator-position-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-item-properties',
    title: 'EXAMPLES.TAB.ITEM_PROPERTIES.TITLE',
    description: 'EXAMPLES.TAB.ITEM_PROPERTIES.DESCRIPTION',
    component: TabItemPropertiesExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-item-properties-example/tab-item-properties-example.component.html`,
        TSpath: `${samplesFolder}/tab-item-properties-example/tab-item-properties-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-prefix-suffix',
    title: 'EXAMPLES.TAB.PREFIX_SUFFIX.TITLE',
    description: 'EXAMPLES.TAB.PREFIX_SUFFIX.DESCRIPTION',
    component: TabPrefixSuffixExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-prefix-suffix-example/tab-prefix-suffix-example.component.html`,
        TSpath: `${samplesFolder}/tab-prefix-suffix-example/tab-prefix-suffix-example.component.ts`,
      },
    ],
  },
  {
    id: 'tab-stretch-tabs',
    title: 'EXAMPLES.TAB.STRETCH_TABS.TITLE',
    description: 'EXAMPLES.TAB.STRETCH_TABS.DESCRIPTION',
    component: TabStretchTabsExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/tab-stretch-tabs-example/tab-stretch-tabs-example.component.html`,
        TSpath: `${samplesFolder}/tab-stretch-tabs-example/tab-stretch-tabs-example.component.ts`,
      },
    ],
  },
];
