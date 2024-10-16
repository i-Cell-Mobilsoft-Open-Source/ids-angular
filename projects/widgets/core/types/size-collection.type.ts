export const IdsSizeCollection = {
  SMALL: 'small',
  BIG: 'big',
} as const;

export type IdsSizeCollectionType = (typeof IdsSizeCollection)[keyof typeof IdsSizeCollection];
