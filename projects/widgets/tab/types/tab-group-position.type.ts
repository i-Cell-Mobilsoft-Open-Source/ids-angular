export const IdsTabGroupPosition = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
} as const;

export type IdsTabGroupPositionType = (typeof IdsTabGroupPosition)[keyof typeof IdsTabGroupPosition];
