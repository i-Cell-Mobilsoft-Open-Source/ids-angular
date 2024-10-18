export const DemoControl = {
  CHECKBOX: 'checkbox',
  TEXT: 'text',
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
};

export type DemoControlConfig<T> = {
  [K in keyof T]: DemoControlItem<T>
};

export type FlatDemoControlItem<T> = Exclude<DemoControlItem<T>, 'list'> & { name: keyof T, list?: string[] };
