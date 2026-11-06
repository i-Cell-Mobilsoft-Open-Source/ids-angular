import { TableAppearancesExampleComponent } from './table-appearances-example/table-appearances-example.component';
import { TableBasicExampleComponent } from './table-basic-example/table-basic-example.component';
import { TableCustomCellTemplatesExampleComponent } from './table-custom-cell-templates-example/table-custom-cell-templates-example.component';
import { TableEmptyStateExampleComponent } from './table-empty-state-example/table-empty-state-example.component';
import { TableFixedHeaderExampleComponent } from './table-fixed-header-example/table-fixed-header-example.component';
import { TableMasterDetailExampleComponent } from './table-master-detail-example/table-master-detail-example.component';
import { TableRowSelectionExampleComponent } from './table-row-selection-example/table-row-selection-example.component';
import { TableServerSideExampleComponent } from './table-server-side-example/table-server-side-example.component';
import { TableSizesExampleComponent } from './table-sizes-example/table-sizes-example.component';
import { TableSortingExampleComponent } from './table-sorting-example/table-sorting-example.component';
import { TableVariantsExampleComponent } from './table-variants-example/table-variants-example.component';
import { TableWithBorderExampleComponent } from './table-with-border-example/table-with-border-example.component';

import { IdsExampleDef, IdsExampleFile } from '../../shared/ids-example-viewer/ids-example.model';

const TABLE_EXAMPLE_SHARED_FILES: IdsExampleFile[] = [
  {
    HTMLpath: '',
    TSpath: 'assets/examples/table/table-example.utils.ts',
  },
  {
    HTMLpath: '',
    TSpath: 'assets/examples/table/table-example-intl.ts',
  },
];

export const TABLE_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'table-basic',
    title: 'EXAMPLES.TABLE.BASIC.TITLE',
    description: 'EXAMPLES.TABLE.BASIC.DESCRIPTION',
    component: TableBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-basic-example/table-basic-example.component.html',
        TSpath: 'assets/examples/table/table-basic-example/table-basic-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-appearances',
    title: 'EXAMPLES.TABLE.APPEARANCES.TITLE',
    description: 'EXAMPLES.TABLE.APPEARANCES.DESCRIPTION',
    component: TableAppearancesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-appearances-example/table-appearances-example.component.html',
        TSpath: 'assets/examples/table/table-appearances-example/table-appearances-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-variants',
    title: 'EXAMPLES.TABLE.VARIANTS.TITLE',
    description: 'EXAMPLES.TABLE.VARIANTS.DESCRIPTION',
    component: TableVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-variants-example/table-variants-example.component.html',
        TSpath: 'assets/examples/table/table-variants-example/table-variants-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-sizes',
    title: 'EXAMPLES.TABLE.SIZES.TITLE',
    description: 'EXAMPLES.TABLE.SIZES.DESCRIPTION',
    component: TableSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-sizes-example/table-sizes-example.component.html',
        TSpath: 'assets/examples/table/table-sizes-example/table-sizes-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-sorting',
    title: 'EXAMPLES.TABLE.SORTING.TITLE',
    description: 'EXAMPLES.TABLE.SORTING.DESCRIPTION',
    component: TableSortingExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-sorting-example/table-sorting-example.component.html',
        TSpath: 'assets/examples/table/table-sorting-example/table-sorting-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-server-side',
    title: 'EXAMPLES.TABLE.SERVER_SIDE.TITLE',
    description: 'EXAMPLES.TABLE.SERVER_SIDE.DESCRIPTION',
    component: TableServerSideExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-server-side-example/table-server-side-example.component.html',
        TSpath: 'assets/examples/table/table-server-side-example/table-server-side-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-row-selection',
    title: 'EXAMPLES.TABLE.ROW_SELECTION.TITLE',
    description: 'EXAMPLES.TABLE.ROW_SELECTION.DESCRIPTION',
    component: TableRowSelectionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-row-selection-example/table-row-selection-example.component.html',
        TSpath: 'assets/examples/table/table-row-selection-example/table-row-selection-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-master-detail',
    title: 'EXAMPLES.TABLE.MASTER_DETAIL.TITLE',
    description: 'EXAMPLES.TABLE.MASTER_DETAIL.DESCRIPTION',
    component: TableMasterDetailExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-master-detail-example/table-master-detail-example.component.html',
        TSpath: 'assets/examples/table/table-master-detail-example/table-master-detail-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-custom-cell-templates',
    title: 'EXAMPLES.TABLE.CUSTOM_CELL_TEMPLATES.TITLE',
    description: 'EXAMPLES.TABLE.CUSTOM_CELL_TEMPLATES.DESCRIPTION',
    component: TableCustomCellTemplatesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-custom-cell-templates-example/table-custom-cell-templates-example.component.html',
        TSpath: 'assets/examples/table/table-custom-cell-templates-example/table-custom-cell-templates-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-with-border',
    title: 'EXAMPLES.TABLE.WITH_BORDER.TITLE',
    description: 'EXAMPLES.TABLE.WITH_BORDER.DESCRIPTION',
    component: TableWithBorderExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-with-border-example/table-with-border-example.component.html',
        TSpath: 'assets/examples/table/table-with-border-example/table-with-border-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-fixed-header',
    title: 'EXAMPLES.TABLE.FIXED_HEADER.TITLE',
    description: 'EXAMPLES.TABLE.FIXED_HEADER.DESCRIPTION',
    component: TableFixedHeaderExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-fixed-header-example/table-fixed-header-example.component.html',
        TSpath: 'assets/examples/table/table-fixed-header-example/table-fixed-header-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
  {
    id: 'table-empty-state',
    title: 'EXAMPLES.TABLE.EMPTY_STATE.TITLE',
    description: 'EXAMPLES.TABLE.EMPTY_STATE.DESCRIPTION',
    component: TableEmptyStateExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/table/table-empty-state-example/table-empty-state-example.component.html',
        TSpath: 'assets/examples/table/table-empty-state-example/table-empty-state-example.component.ts',
      },
      ...TABLE_EXAMPLE_SHARED_FILES,
    ],
  },
];
