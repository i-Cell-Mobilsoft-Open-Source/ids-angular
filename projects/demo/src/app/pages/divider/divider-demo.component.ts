import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSize,
  IdsSizeType,
  IdsOrientationType, 
  IdsOrientation } from '@i-cell/ids-angular/core';
import { IDS_DIVIDER_DEFAULT_CONFIG_FACTORY, IdsDividerComponent, IdsDividerVariant, IdsDividerVariantType } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_DIVIDER_DEFAULT_CONFIG_FACTORY();

type DividerInputControls = {
  size: IdsSizeType,
  variant: IdsDividerVariantType,
  orientation: IdsOrientationType,
  width: string,
  height: string,
};

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsDividerComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './divider-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './divider-demo.component.scss',
  ],
})
export class DividerDemoComponent {
  protected _inputControlConfig: DemoControlConfig<DividerInputControls> = {
    orientation: {
      description: 'Divider orientation.',
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: 'select',
      list: convertEnumToStringArray(IdsOrientation),
    },
    size: {
      description: 'Divider size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Divider variant.',
      type: 'IdsDividerVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsDividerVariant),
    },
    width: {
      description: 'Divider width as css property.',
      type: 'string',
      default: defaultConfig.width,
      demoDefault: '100%',
    },
    height: {
      description: 'Divider height as css property.',
      type: 'string',
      default: defaultConfig.height,
      demoDefault: '100%',
    },
  };

  public defaults = getDefaultFromDemoConfig<DividerInputControls>(this._inputControlConfig);

  public model: DividerInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
