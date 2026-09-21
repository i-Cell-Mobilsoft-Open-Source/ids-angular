import { DatepickerAppearanceExampleComponent } from './datepicker-appearance-example/datepicker-appearance-example.component';
import { DatepickerFormControlExampleComponent } from './datepicker-form-control-example/datepicker-form-control-example.component';
import { DatepickerMinMaxExampleComponent } from './datepicker-min-max-example/datepicker-min-max-example.component';
import { DatepickerNgModelExampleComponent } from './datepicker-ng-model-example/datepicker-ng-model-example.component';
import { DatepickerSizesExampleComponent } from './datepicker-sizes-example/datepicker-sizes-example.component';
import { DatepickerViewsExampleComponent } from './datepicker-views-example/datepicker-views-example.component';
import { DatepickerWeekendValidatorExampleComponent } from './datepicker-weekend-validator-example/datepicker-weekend-validator-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const samplesFolder = 'assets/examples/datepicker';

export const DATEPICKER_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'datepicker-appearance',
    title: 'EXAMPLES.DATEPICKER.APPEARANCE.TITLE',
    description: 'EXAMPLES.DATEPICKER.APPEARANCE.DESCRIPTION',
    component: DatepickerAppearanceExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-appearance-example/datepicker-appearance-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-appearance-example/datepicker-appearance-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-sizes',
    title: 'EXAMPLES.DATEPICKER.SIZES.TITLE',
    description: 'EXAMPLES.DATEPICKER.SIZES.DESCRIPTION',
    component: DatepickerSizesExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-sizes-example/datepicker-sizes-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-sizes-example/datepicker-sizes-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-ng-model',
    title: 'EXAMPLES.DATEPICKER.NG_MODEL.TITLE',
    description: 'EXAMPLES.DATEPICKER.NG_MODEL.DESCRIPTION',
    component: DatepickerNgModelExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-ng-model-example/datepicker-ng-model-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-ng-model-example/datepicker-ng-model-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-form-control',
    title: 'EXAMPLES.DATEPICKER.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.DATEPICKER.FORM_CONTROL.DESCRIPTION',
    component: DatepickerFormControlExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-form-control-example/datepicker-form-control-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-form-control-example/datepicker-form-control-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-views',
    title: 'EXAMPLES.DATEPICKER.VIEWS.TITLE',
    description: 'EXAMPLES.DATEPICKER.VIEWS.DESCRIPTION',
    component: DatepickerViewsExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-views-example/datepicker-views-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-views-example/datepicker-views-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-min-max',
    title: 'EXAMPLES.DATEPICKER.MIN_MAX.TITLE',
    description: 'EXAMPLES.DATEPICKER.MIN_MAX.DESCRIPTION',
    component: DatepickerMinMaxExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-min-max-example/datepicker-min-max-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-min-max-example/datepicker-min-max-example.component.ts`,
      },
    ],
  },
  {
    id: 'datepicker-weekend-validator',
    title: 'EXAMPLES.DATEPICKER.WEEKEND_VALIDATOR.TITLE',
    description: 'EXAMPLES.DATEPICKER.WEEKEND_VALIDATOR.DESCRIPTION',
    component: DatepickerWeekendValidatorExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/datepicker-weekend-validator-example/datepicker-weekend-validator-example.component.html`,
        TSpath: `${samplesFolder}/datepicker-weekend-validator-example/datepicker-weekend-validator-example.component.ts`,
      },
    ],
  },
];
