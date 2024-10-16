export const IdsPaginatorPageButtonAppearance = {
  PLAIN: 'plain',
} as const;

export type IdsPaginatorPageButtonAppearanceType = (typeof IdsPaginatorPageButtonAppearance)[keyof typeof IdsPaginatorPageButtonAppearance];
