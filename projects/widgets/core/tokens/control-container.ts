import { InjectionToken, Signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface IdsControlAccessor {
  control: AbstractControl | null;
}

export interface IdsControlContainer {
  controlDir: Signal<IdsControlAccessor | null>;
}

export const IDS_CONTROL_CONTAINER =
  new InjectionToken<IdsControlContainer>('IDS_CONTROL_CONTAINER');
