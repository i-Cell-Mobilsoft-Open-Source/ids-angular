import { OptionBasicExampleComponent } from './option-basic-example/option-basic-example.component';
import { OptionDisabledExampleComponent } from './option-disabled-example/option-disabled-example.component';
import { OptionGroupsExampleComponent } from './option-groups-example/option-groups-example.component';
import { OptionMultiselectExampleComponent } from './option-multiselect-example/option-multiselect-example.component';
import { OptionViewValueExampleComponent } from './option-view-value-example/option-view-value-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const OPTION_EXAMPLE_UTILS = {
  HTMLpath: '',
  TSpath: 'assets/examples/option/option-example.utils.ts',
};

export const OPTION_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'option-basic',
    title: 'EXAMPLES.OPTION.BASIC.TITLE',
    description: 'EXAMPLES.OPTION.BASIC.DESCRIPTION',
    component: OptionBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/option/option-basic-example/option-basic-example.component.html',
        TSpath: 'assets/examples/option/option-basic-example/option-basic-example.component.ts',
      },
      OPTION_EXAMPLE_UTILS,
    ],
  },
  {
    id: 'option-view-value',
    title: 'EXAMPLES.OPTION.VIEW_VALUE.TITLE',
    description: 'EXAMPLES.OPTION.VIEW_VALUE.DESCRIPTION',
    component: OptionViewValueExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/option/option-view-value-example/option-view-value-example.component.html',
        TSpath: 'assets/examples/option/option-view-value-example/option-view-value-example.component.ts',
      },
    ],
  },
  {
    id: 'option-groups',
    title: 'EXAMPLES.OPTION.GROUPS.TITLE',
    description: 'EXAMPLES.OPTION.GROUPS.DESCRIPTION',
    component: OptionGroupsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/option/option-groups-example/option-groups-example.component.html',
        TSpath: 'assets/examples/option/option-groups-example/option-groups-example.component.ts',
      },
      OPTION_EXAMPLE_UTILS,
    ],
  },
  {
    id: 'option-disabled',
    title: 'EXAMPLES.OPTION.DISABLED.TITLE',
    description: 'EXAMPLES.OPTION.DISABLED.DESCRIPTION',
    component: OptionDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/option/option-disabled-example/option-disabled-example.component.html',
        TSpath: 'assets/examples/option/option-disabled-example/option-disabled-example.component.ts',
      },
      OPTION_EXAMPLE_UTILS,
    ],
  },
  {
    id: 'option-multiselect',
    title: 'EXAMPLES.OPTION.MULTISELECT.TITLE',
    description: 'EXAMPLES.OPTION.MULTISELECT.DESCRIPTION',
    component: OptionMultiselectExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/option/option-multiselect-example/option-multiselect-example.component.html',
        TSpath: 'assets/examples/option/option-multiselect-example/option-multiselect-example.component.ts',
      },
      OPTION_EXAMPLE_UTILS,
    ],
  },
];
