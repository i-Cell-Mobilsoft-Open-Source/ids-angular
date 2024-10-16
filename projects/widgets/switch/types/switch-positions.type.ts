export const IdsSwitchIconPosition = {
  ONHANDLE: 'onhandle',
  ONTRACK: 'ontrack',
} as const;

export type IdsSwitchIconPositionType = (typeof IdsSwitchIconPosition)[keyof typeof IdsSwitchIconPosition];

export const IdsSwitchLabelPosition = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export type IdsSwitchLabelPositionType = (typeof IdsSwitchLabelPosition)[keyof typeof IdsSwitchLabelPosition];
