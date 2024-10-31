import { IdsAvatarVariantType } from '../types/avatar-variant.type';

import { InjectionToken, Signal } from '@angular/core';

export abstract class IdsAvatarParent {
  public readonly embeddedAvatarVariant!: Signal<IdsAvatarVariantType>;
};

export const IDS_AVATAR_PARENT = new InjectionToken<IdsAvatarParent>(
  'IDS_AVATAR_PARENT',
);
