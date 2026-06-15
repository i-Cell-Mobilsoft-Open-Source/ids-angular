import { Injectable } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SPINNER_DEFAULT_CONFIG_FACTORY, IdsSpinnerVariant, IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner';

const defaultConfig = IDS_SPINNER_DEFAULT_CONFIG_FACTORY();

type SpinnerInputControls = {
  size: IdsSizeType,
  variant: IdsSpinnerVariantType,
  sizeCollection: IdsSizeCollectionType,
  isTrack: boolean,
};
@Injectable()
export class SpinnerDemoService {
  public readonly inputControlConfig: DemoControlConfig<SpinnerInputControls> = {
    size: {
      description: 'Spinner size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: 'Spinner variant.',
      type: 'IdsSpinnerVariantType',
      default: defaultConfig.variant,
      list: Object.values(IdsSpinnerVariant),
      control: 'select',
    },
    sizeCollection: {
      description: 'Spinner size collection.',
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      list: Object.values(IdsSizeCollection),
      control: 'select',
    },
    isTrack: {
      description: 'Spinner is track.',
      type: 'boolean',
      default: defaultConfig.isTrack,
      control: 'switch',
    },
  };

  public defaults = getDefaultFromDemoConfig<SpinnerInputControls>(this.inputControlConfig);

  public model: SpinnerInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }

}
