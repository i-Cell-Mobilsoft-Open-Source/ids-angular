import { compare } from '@i-cell/ids-angular/core';
import {
  IdsTableColumnDef,
  IdsTableRequestFactory,
  IdsTableSortDirection,
} from '@i-cell/ids-angular/table';
import { delay, of } from 'rxjs';

export const TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE = 5;
export const TABLE_EXAMPLE_SERVER_SIDE_DELAY_MS = 1000;

export const TABLE_EXAMPLE_HEADER_RENDERER = 'translateHeader';

export interface TableExampleRow {
  name: string;
  role: string;
  status: string;
  score: number;
  description: string;
}

export const TABLE_EXAMPLE_ROWS: TableExampleRow[] = [
  {
    name: 'Alice',
    role: 'Admin',
    status: 'Active',
    score: 92,
    description: 'Team lead with full access to all modules.',
  },
  {
    name: 'Bob',
    role: 'Editor',
    status: 'Active',
    score: 85,
    description: 'Can edit content and review submissions.',
  },
  {
    name: 'Carol',
    role: 'Viewer',
    status: 'Inactive',
    score: 71,
    description: 'Read-only access to published content.',
  },
];

export const TABLE_EXAMPLE_SCROLL_ROWS: TableExampleRow[] = [
  ...TABLE_EXAMPLE_ROWS,
  {
    name: 'David',
    role: 'Editor',
    status: 'Active',
    score: 88,
    description: 'Reviews and publishes weekly content updates.',
  },
  {
    name: 'Eva',
    role: 'Admin',
    status: 'Active',
    score: 95,
    description: 'Manages user accounts and permissions.',
  },
  {
    name: 'Frank',
    role: 'Viewer',
    status: 'Active',
    score: 76,
    description: 'Monitors dashboards and reports.',
  },
  {
    name: 'Grace',
    role: 'Editor',
    status: 'Inactive',
    score: 82,
    description: 'Former content editor on extended leave.',
  },
  {
    name: 'Henry',
    role: 'Viewer',
    status: 'Active',
    score: 69,
    description: 'Read-only access for audit purposes.',
  },
  {
    name: 'Ivy',
    role: 'Admin',
    status: 'Active',
    score: 91,
    description: 'Coordinates team onboarding workflows.',
  },
  {
    name: 'Jack',
    role: 'Editor',
    status: 'Active',
    score: 87,
    description: 'Maintains documentation and release notes.',
  },
];

export function createTableExampleColumnDefs(): IdsTableColumnDef<TableExampleRow>[] {
  return [
    {
      id: 'name',
      label: 'EXAMPLES.TABLE.COMMON.COL_NAME',
      headerCellRenderer: TABLE_EXAMPLE_HEADER_RENDERER,
      field: 'name',
      identifier: true,
      sortable: true,
    },
    {
      id: 'role',
      label: 'EXAMPLES.TABLE.COMMON.COL_ROLE',
      headerCellRenderer: TABLE_EXAMPLE_HEADER_RENDERER,
      field: 'role',
    },
    {
      id: 'status',
      label: 'EXAMPLES.TABLE.COMMON.COL_STATUS',
      headerCellRenderer: TABLE_EXAMPLE_HEADER_RENDERER,
      field: 'status',
    },
    {
      id: 'score',
      label: 'EXAMPLES.TABLE.COMMON.COL_SCORE',
      headerCellRenderer: TABLE_EXAMPLE_HEADER_RENDERER,
      field: 'score',
      cellRenderer: 'numeric',
      sortable: true,
    },
  ];
}

export function createTableExampleServerSideRequestFactory(
  rows: TableExampleRow[] = TABLE_EXAMPLE_SCROLL_ROWS,
  defaultPageSize = TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE,
): IdsTableRequestFactory<TableExampleRow> {
  return (paginationData, sortInfo) => {
    const pageSize = paginationData?.rows ?? defaultPageSize;
    const page = paginationData?.page ?? 1;
    const result = [...rows];

    if (sortInfo?.sortBy && sortInfo.direction !== IdsTableSortDirection.NONE) {
      const isAscending = sortInfo.direction === IdsTableSortDirection.ASC;

      result.sort((item1, item2) => {
        const value1 = item1[sortInfo.sortBy as keyof TableExampleRow];
        const value2 = item2[sortInfo.sortBy as keyof TableExampleRow];

        return compare(isAscending ? value1 : value2, isAscending ? value2 : value1);
      });
    }

    const startIndex = (page - 1) * pageSize;

    return of({
      resultList: result.slice(startIndex, startIndex + pageSize),
      paginationParams: {
        totalRows: rows.length,
        rows: pageSize,
        page,
      },
    }).pipe(delay(TABLE_EXAMPLE_SERVER_SIDE_DELAY_MS));
  };
}
