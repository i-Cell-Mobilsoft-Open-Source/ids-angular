export const IdsPseudoCheckboxState = {
  UNCHECKED: 'unchecked',
  CHECKED: 'checked',
  INDETERMINATE: 'indeterminate',
} as const;

export type IdsPseudoCheckboxStateType = (typeof IdsPseudoCheckboxState)[keyof typeof IdsPseudoCheckboxState];
