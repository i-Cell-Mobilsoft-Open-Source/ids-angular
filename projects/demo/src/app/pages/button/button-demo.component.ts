import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent, IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType, IDS_BUTTON_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();

type ButtonInputControls = {
  appearance: IdsButtonAppearanceType,
  size: IdsSizeType,
  variant: IdsButtonVariantType,
  disabled: boolean,
};

type ButtonHelperControls = {
  text: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  standalone: true,
  selector: 'app-button-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './button-demo.component.scss',
  ],
})
export class ButtonDemoComponent {
  protected _inputControlConfig: DemoControlConfig<ButtonInputControls> = {
    appearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.appearance,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<ButtonHelperControls> = {
    text: {
      description: 'Text of button',
      type: 'string',
      default: '-',
      demoDefault: 'Sample button',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    hasLeadingIcon: {
      description: 'Whether the button has leading icon or not.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<ButtonInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ButtonHelperControls>(this._helperControlConfig);

  public model: ButtonInputControls = { ...this.defaults };
  public helperModel: ButtonHelperControls = { ...this.helperDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
