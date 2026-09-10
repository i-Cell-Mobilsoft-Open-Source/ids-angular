import { DemoControlConfig } from './demo-control.type';

export type DemoApiControlConfig = {
  title: string;
  config: DemoControlConfig<unknown>;
};
