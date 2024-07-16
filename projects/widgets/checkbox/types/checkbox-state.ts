export const CheckboxState = {
  UNCHECKED: 'unchecked',
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
} as const;

export type CheckboxStateType = (typeof CheckboxState)[keyof typeof CheckboxState];
