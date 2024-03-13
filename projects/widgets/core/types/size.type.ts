export const Size = {
  COMPACT: 'compact',
  COMFORTABLE: 'comfortable',
  SPACIOUS: 'spacious',
  DENSE: 'dense'
} as const;

export type SizeType = (typeof Size)[keyof typeof Size];
