import { IdsIconButtonAppearanceType } from '../types/icon-button-appearance.type';

import { InjectionToken, Signal } from '@angular/core';
import { IdsAllVariantsType } from '@i-cell/ids-angular/core';

export abstract class IdsIconButtonParent {
  public readonly embeddedIconButtonVariant!: Signal<IdsAllVariantsType>;
  public readonly embeddedIconButtonAppearance!: Signal<IdsIconButtonAppearanceType>;
  public readonly disabled!: Signal<boolean>;
};

export const IDS_ICON_BUTTON_PARENT = new InjectionToken<IdsIconButtonParent>(
  'IDS_ICON_BUTTON_PARENT',
);
