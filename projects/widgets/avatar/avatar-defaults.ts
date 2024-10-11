import { AvatarType, AvatarTypeType } from './public-api';
import { AvatarVariant, AvatarVariantType } from './types/avatar-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeCollection, SizeCollectionType, SizeType } from '@i-cell/ids-angular/core';

export interface IdsAvatarDefaultConfig {
  type: AvatarTypeType
  size?: SizeType
  sizeCollection?: SizeCollectionType
  variant?: AvatarVariantType,
}

export const IDS_AVATAR_DEFAULT_CONFIG = new InjectionToken<IdsAvatarDefaultConfig>(
  'IDS_AVATAR_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_AVATAR_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_AVATAR_DEFAULT_CONFIG_FACTORY(): Required<IdsAvatarDefaultConfig> {
  return {
    type: AvatarType.INITIALS,
    size: Size.COMPACT,
    sizeCollection: SizeCollection.SMALL,
    variant: AvatarVariant.PRIMARY,
  };
}

