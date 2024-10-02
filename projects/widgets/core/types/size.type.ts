export const Size = {
  DENSE: 'dense',
  COMPACT: 'compact',
  COMFORTABLE: 'comfortable',
  SPACIOUS: 'spacious',
} as const;

export type SizeType = (typeof Size)[keyof typeof Size];
