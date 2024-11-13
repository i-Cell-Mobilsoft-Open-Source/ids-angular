import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent, IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY, IdsButtonGroupComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY();

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

type ButtonGroupInputControls = {
  size: IdsSizeType,
};

@Component({
  standalone: true,
  selector: 'app-button-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsButtonComponent,
    IdsButtonGroupComponent,
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
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    size: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    disabled: {
      description: 'Whether the button is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _groupInputControlConfig: DemoControlConfig<ButtonGroupInputControls> = {
    size: {
      description: 'All button size in a group.',
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public defaults = getDefaultFromDemoConfig<ButtonInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ButtonHelperControls>(this._helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<ButtonGroupInputControls>(this._groupInputControlConfig);

  public model: ButtonInputControls = { ...this.defaults };
  public helperModel: ButtonHelperControls = { ...this.helperDefaults };
  public groupModel: ButtonGroupInputControls = { ...this.groupDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
  }
}
