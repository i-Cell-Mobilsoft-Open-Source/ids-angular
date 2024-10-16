export const IdsSize = {
  DENSE: 'dense',
  COMPACT: 'compact',
  COMFORTABLE: 'comfortable',
  SPACIOUS: 'spacious',
} as const;

export type IdsSizeType = (typeof IdsSize)[keyof typeof IdsSize];
