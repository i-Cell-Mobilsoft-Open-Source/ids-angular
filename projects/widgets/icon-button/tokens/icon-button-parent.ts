import { IdsIconButtonAppearanceType } from '../types/icon-button-appearance.type';
import { IdsIconButtonVariantType } from '../types/icon-button-variant.type';

import { InjectionToken, Signal } from '@angular/core';

export abstract class IdsIconButtonParent {
  public readonly embeddedIconButtonVariant!: Signal<IdsIconButtonVariantType>;
  public readonly embeddedIconButtonAppearance!: Signal<IdsIconButtonAppearanceType>;
  public readonly disabled!: Signal<boolean>;
};

export const IDS_ICON_BUTTON_PARENT = new InjectionToken<IdsIconButtonParent>(
  'IDS_ICON_BUTTON_PARENT',
);
