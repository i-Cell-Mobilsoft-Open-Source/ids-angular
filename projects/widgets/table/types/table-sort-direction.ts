export const IdsTableSortDirection = {
  NONE: '',
  ASC: 'asc',
  DESC: 'desc',
} as const;

export type IdsTableSortDirectionType = (typeof IdsTableSortDirection)[keyof typeof IdsTableSortDirection];
