export const SwitchIconPosition = {
  ONHANDLE: 'onhandle',
  ONTRACK: 'ontrack',
} as const;

export type SwitchIconPositionType = (typeof SwitchIconPosition)[keyof typeof SwitchIconPosition];

export const SwitchLabelPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type SwitchLabelPositionType = (typeof SwitchLabelPosition)[keyof typeof SwitchLabelPosition];
