export const DemoControl = {
  CHECKBOX: 'checkbox',
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
} as const;

export type DemoControlType = (typeof DemoControl)[keyof typeof DemoControl];

export type DemoControlItem<T> = {
  description: string,
  type: string,
  default: T[keyof T],
  demoDefault?: T[keyof T],
  control?: DemoControlType,
  list?: string[],
  disabled?: boolean,
  min?: number,
  step?: number,
  onModelChange?: () => void,
};

export type DemoControlConfig<T> = {
  [K in keyof T]: DemoControlItem<T>
};

export type FlatDemoControlItem<T> = Exclude<DemoControlItem<T>, 'list'> & { name: keyof T, list?: string[] };
