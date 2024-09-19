export const IconSizeCollection = {
  SMALL: 'small',
  BIG: 'big',
} as const;

export type IconSizeCollectionType = (typeof IconSizeCollection)[keyof typeof IconSizeCollection];
