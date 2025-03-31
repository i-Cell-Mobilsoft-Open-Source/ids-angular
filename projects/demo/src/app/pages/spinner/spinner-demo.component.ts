import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner/spinner.component';
import { IdsSpinnerVariant, IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner/types/spinner-variant.type';
import { TranslatePipe } from '@ngx-translate/core';

type SpinnerInputControls = {
  size: IdsSizeType,
  variant: IdsSpinnerVariantType,
  sizeCollection: IdsSizeCollectionType,
  isTrack: boolean,
};

@Component({
  selector: 'app-spinner-demo',
  imports: [
    IdsSpinnerComponent,
    TranslatePipe,
    TryoutComponent,
    ControlTableComponent,
  ],
  templateUrl: './spinner-demo.component.html',
  styleUrl: './spinner-demo.component.scss',
})
export class SpinnerDemoComponent {

  protected _inputControlConfig: DemoControlConfig<SpinnerInputControls> = {
    size: {
      description: 'Spinner size.',
      type: 'IdsSizeType',
      default: IdsSize.DENSE,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: 'Spinner variant.',
      type: 'IdsSpinnerVariantType',
      default: IdsSpinnerVariant.SURFACE,
      list: Object.values(IdsSpinnerVariant),
      control: 'select',
    },
    sizeCollection: {
      description: 'Spinner size collection.',
      type: 'IdsSizeCollectionType',
      default: IdsSizeCollection.BIG,
      list: Object.values(IdsSizeCollection),
      control: 'select',
    },
    isTrack: {
      description: 'Spinner is track.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<SpinnerInputControls>(this._inputControlConfig);

  public model: SpinnerInputControls = { ...this.defaults };

}
