export const PaginatorPageButtonAppearance = {
  PLAIN: 'plain',
} as const;

export type PaginatorPageButtonAppearanceType = (typeof PaginatorPageButtonAppearance)[keyof typeof PaginatorPageButtonAppearance];
