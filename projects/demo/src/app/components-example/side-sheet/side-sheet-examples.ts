import { SideSheetBackButtonExampleComponent } from './side-sheet-back-button-example/side-sheet-back-button-example.component';
import { SideSheetBasicExampleComponent } from './side-sheet-basic-example/side-sheet-basic-example.component';
import { SideSheetCustomHeaderExampleComponent } from './side-sheet-custom-header-example/side-sheet-custom-header-example.component';
import { SideSheetFooterExampleComponent } from './side-sheet-footer-example/side-sheet-footer-example.component';
import { SideSheetFormExampleComponent } from './side-sheet-form-example/side-sheet-form-example.component';
import { SideSheetPositionExampleComponent } from './side-sheet-position-example/side-sheet-position-example.component';
import { SideSheetScrollableExampleComponent } from './side-sheet-scrollable-example/side-sheet-scrollable-example.component';
import { SideSheetSizesExampleComponent } from './side-sheet-sizes-example/side-sheet-sizes-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SIDE_SHEET_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'side-sheet-basic',
    title: 'EXAMPLES.SIDE_SHEET.BASIC.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.BASIC.DESCRIPTION',
    component: SideSheetBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-basic-example/side-sheet-basic-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-basic-example/side-sheet-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-position',
    title: 'EXAMPLES.SIDE_SHEET.POSITION.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.POSITION.DESCRIPTION',
    component: SideSheetPositionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-position-example/side-sheet-position-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-position-example/side-sheet-position-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-custom-header',
    title: 'EXAMPLES.SIDE_SHEET.CUSTOM_HEADER.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.CUSTOM_HEADER.DESCRIPTION',
    component: SideSheetCustomHeaderExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-custom-header-example/side-sheet-custom-header-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-custom-header-example/side-sheet-custom-header-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-footer',
    title: 'EXAMPLES.SIDE_SHEET.FOOTER.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.FOOTER.DESCRIPTION',
    component: SideSheetFooterExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-footer-example/side-sheet-footer-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-footer-example/side-sheet-footer-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-form',
    title: 'EXAMPLES.SIDE_SHEET.FORM.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.FORM.DESCRIPTION',
    component: SideSheetFormExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-form-example/side-sheet-form-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-form-example/side-sheet-form-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-back-button',
    title: 'EXAMPLES.SIDE_SHEET.BACK_BUTTON.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.BACK_BUTTON.DESCRIPTION',
    component: SideSheetBackButtonExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-back-button-example/side-sheet-back-button-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-back-button-example/side-sheet-back-button-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-scrollable',
    title: 'EXAMPLES.SIDE_SHEET.SCROLLABLE.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.SCROLLABLE.DESCRIPTION',
    component: SideSheetScrollableExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-scrollable-example/side-sheet-scrollable-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-scrollable-example/side-sheet-scrollable-example.component.ts',
      },
    ],
  },
  {
    id: 'side-sheet-sizes',
    title: 'EXAMPLES.SIDE_SHEET.SIZES.TITLE',
    description: 'EXAMPLES.SIDE_SHEET.SIZES.DESCRIPTION',
    component: SideSheetSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/side-sheet/side-sheet-sizes-example/side-sheet-sizes-example.component.html',
        TSpath: 'assets/examples/side-sheet/side-sheet-sizes-example/side-sheet-sizes-example.component.ts',
      },
    ],
  },
];
