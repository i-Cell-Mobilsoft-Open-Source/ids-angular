import { IdsIconVariantType } from '../types/icon-variant.type';

import { InjectionToken, Signal } from '@angular/core';

export abstract class IdsIconParent {
  public readonly embeddedIconVariant!: Signal<IdsIconVariantType>;
};

export const IDS_ICON_PARENT = new InjectionToken<IdsIconParent>(
  'IDS_ICON_PARENT',
);
