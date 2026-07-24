export const IdsTabGroupAlignment = {
  START: 'start',
  CENTER: 'center',
  END: 'end',
} as const;

export type IdsTabGroupAlignmentType = (typeof IdsTabGroupAlignment)[keyof typeof IdsTabGroupAlignment];
