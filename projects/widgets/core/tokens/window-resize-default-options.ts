import { InjectionToken } from '@angular/core';

export const DEFAULT_AUDIT_TIME = 10;

export interface IdsWindowResizeDefaultOptions {
  auditTime: number
}

export const IDS_WINDOW_RESIZE_DEFAULT_OPTIONS = new InjectionToken<IdsWindowResizeDefaultOptions>(
  'IDS_WINDOW_RESIZE_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_WINDOW_RESIZE_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_WINDOW_RESIZE_DEFAULT_OPTIONS_FACTORY(): Required<IdsWindowResizeDefaultOptions> {
  return {
    auditTime: DEFAULT_AUDIT_TIME,
  };
}
