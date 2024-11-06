import { IdsButtonVariantType } from '../types/button-variant.type';

import { InjectionToken, Signal } from '@angular/core';

export abstract class IdsButtonParent {
  public readonly embeddedButtonVariant!: Signal<IdsButtonVariantType>;
};

export const IDS_BUTTON_PARENT = new InjectionToken<IdsButtonParent>(
  'IDS_BUTTON_PARENT',
);
