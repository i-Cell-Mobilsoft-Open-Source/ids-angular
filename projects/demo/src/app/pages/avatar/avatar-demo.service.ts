import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarVariant, IdsAvatarVariantType } from '@i-cell/ids-angular/avatar';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

type AvatarInputControls = {
  initials: string,
  size: IdsSizeType,
  sizeCollection: IdsSizeCollectionType,
  variant: IdsAvatarVariantType,
};
export class AvatarDemoService {

  public readonly inputControlConfig: DemoControlConfig<AvatarInputControls> = {
    initials: {
      description: 'Avatar initials.',
      type: 'string',
      default: '-',
      demoDefault: 'SJ',
    },
    size: {
      description: 'Avatar size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: 'Avatar sizeCollection.',
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: 'Avatar variant.',
      type: 'IdsAvatarVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsAvatarVariant),
    },
  };

  public defaults = getDefaultFromDemoConfig<AvatarInputControls>(this.inputControlConfig);

  public model: AvatarInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
