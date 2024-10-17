import { InjectionToken, Signal } from '@angular/core';
import { IdsIconVariantType } from '@i-cell/ids-angular/icon';

export abstract class IdsIconParent {
  public readonly embeddedIconVariant!: Signal<IdsIconVariantType>;
};

export const IDS_ICON_PARENT = new InjectionToken<IdsIconParent>(
  'IDS_ICON_PARENT',
);
