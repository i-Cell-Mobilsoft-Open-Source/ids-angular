import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent, IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonVariantType, IdsIconButtonVariant, IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

type IconButtonInputControls = {
  size: IdsSizeType,
  variant: IdsIconButtonVariantType,
  appearance: IdsIconButtonAppearanceType,
  disabled: boolean,
};

@Component({
  selector: 'app-icon-button-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-button-demo.component.scss',
  ],
})
export class IconButtonDemoComponent {
  protected _inputControlConfig: DemoControlConfig<IconButtonInputControls> = {
    size: {
      description: 'Icon Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Icon Button variant.',
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonVariant),
    },
    appearance: {
      description: 'Icon Button appearance.',
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonAppearance),
    },
    disabled: {
      description: 'Whether the icon button is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} icon button clicked`);
  }

  public defaults = getDefaultFromDemoConfig<IconButtonInputControls>(this._inputControlConfig);

  public model: IconButtonInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
