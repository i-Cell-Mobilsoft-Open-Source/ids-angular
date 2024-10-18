import { DemoControlConfig, DemoControlItem } from '../types/demo-control.type';

export function getDefaultFromDemoConfig<T>(config: DemoControlConfig<T>): T {
  return Object.fromEntries(
    Object.entries<DemoControlItem<T>>(config).map(
      ([
        key,
        value,
      ]) => {
        const x = value.demoDefault ?? value.default;
        return [
          key,
          x,
        ];
      })) as T;
}
