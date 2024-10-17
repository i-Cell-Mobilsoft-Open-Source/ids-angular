import { IdsAvatarType, IdsAvatarTypeType } from '../types/avatar-type.type';
import { IdsAvatarVariant, IdsAvatarVariantType } from '../types/avatar-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsAvatarDefaultConfig {
  type: IdsAvatarTypeType
  size?: IdsSizeType
  sizeCollection?: IdsSizeCollectionType
  variant?: IdsAvatarVariantType,
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
    type: IdsAvatarType.INITIALS,
    size: IdsSize.COMPACT,
    sizeCollection: IdsSizeCollection.SMALL,
    variant: IdsAvatarVariant.PRIMARY,
  };
}

