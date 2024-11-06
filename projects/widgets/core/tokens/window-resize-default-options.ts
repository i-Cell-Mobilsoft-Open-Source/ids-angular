import { InjectionToken } from '@angular/core';

export const DEFAULT_AUDIT_TIME = 10;

export interface IdsWindowResizeDefaultConfig {
  auditTime: number
}

export const IDS_WINDOW_RESIZE_DEFAULT_CONFIG = new InjectionToken<IdsWindowResizeDefaultConfig>(
  'IDS_WINDOW_RESIZE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_WINDOW_RESIZE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_WINDOW_RESIZE_DEFAULT_CONFIG_FACTORY(): Required<IdsWindowResizeDefaultConfig> {
  return {
    auditTime: DEFAULT_AUDIT_TIME,
  };
}
