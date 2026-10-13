export const IdsTableDetailTogglePosition = {
  BEFORE: 'before',
  AFTER: 'after',
} as const;

export type IdsTableDetailTogglePositionType = (typeof IdsTableDetailTogglePosition)[keyof typeof IdsTableDetailTogglePosition];
