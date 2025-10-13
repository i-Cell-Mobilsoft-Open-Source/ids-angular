import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, Input } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY, IdsButtonGroupComponent, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY();

export type ButtonInputControls = {
  appearance: IdsButtonAppearanceType,
  size: IdsSizeType,
  variant: IdsButtonVariantType,
  disabled: boolean,
  asLink: boolean,
};

export type ButtonHelperControls = {
  text: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

export type ButtonGroupInputControls = {
  size: IdsSizeType,
};

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    IdsButtonComponent,
    IdsButtonGroupComponent,
    IdsIconComponent,
    TranslateModule,
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
      control: DemoControl.SWITCH,
    },
    asLink: {
      description: 'Whether the idsButton is a link (or button).',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
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
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
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

  @Input() public model: ButtonInputControls = { ...this.defaults };
  @Input() public helperModel: ButtonHelperControls = { ...this.helperDefaults };
  @Input() public groupModel: ButtonGroupInputControls = { ...this.groupDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
  }

}
