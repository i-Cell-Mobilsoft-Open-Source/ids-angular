export const IdsCheckboxState = {
  UNCHECKED: 'unchecked',
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
} as const;

export type IdsCheckboxStateType = (typeof IdsCheckboxState)[keyof typeof IdsCheckboxState];
