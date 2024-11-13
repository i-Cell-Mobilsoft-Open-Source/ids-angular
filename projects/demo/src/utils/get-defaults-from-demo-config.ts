import { DemoControlConfig, DemoControlItem } from '../types/demo-control.type';

export function getDefaultFromDemoConfig<T>(config: DemoControlConfig<T>): T {
  return Object.fromEntries(
    Object.entries<DemoControlItem<T[keyof T]>>(config).map(
      ([
        key,
        value,
      ]) => {
        const defaultValue = value.demoDefault ?? value.default;
        return [
          key,
          defaultValue,
        ];
      })) as T;
}
