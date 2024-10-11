export const SizeCollection = {
  SMALL: 'small',
  BIG: 'big',
} as const;

export type SizeCollectionType = (typeof SizeCollection)[keyof typeof SizeCollection];
