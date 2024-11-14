export const DemoControl = {
  CHECKBOX: 'checkbox',
  TEXT: 'text',
  TEXTARRAY: 'textarray',
  NUMBER: 'number',
  NUMBERARRAY: 'numberarray',
  SELECT: 'select',
} as const;

export type DemoControlType = (typeof DemoControl)[keyof typeof DemoControl];

export type DemoControlItem<T> = {
  description: string,
  type: string,
  default: T,
  demoDefault?: T,
  control?: DemoControlType,
  list?: string[],
  disabled?: boolean,
  min?: number,
  step?: number,
  onModelChange?: () => void,
};

export type DemoControlConfig<T> = {
  [K in keyof T]: DemoControlItem<T[K]>
};

export type FlatDemoControlItem<T> = DemoControlItem<T> & { name: keyof T };
