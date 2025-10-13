import { ButtonGroupInputControls, ButtonHelperControls, ButtonInputControls } from './button-demo.component';

import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { ButtonDemoControlsComponent } from '../button-refactor/button-demo-controls.component';

import { Component } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonAppearance, IdsButtonVariant, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/button';
import { IdsSize } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

const defaultGroupConfig = IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY();
const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-button-demo-control',
  standalone: true,
  imports: [

    TryoutControlComponent,
    TranslateModule,
    ButtonDemoControlsComponent,
  ],
  templateUrl: './button-demo-control.component.html',
  //styleUrls: ['./button-demo-content.component.scss'], // Létre kell hozni
})

export class ButtonDemoControlComponent {

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
    asLink: {
      description: 'Whether the idsButton is a link (or button).',
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

  public onModelChange(newModel: ButtonInputControls): void {
    this.model = newModel;
  }

  public onHelperModelChange(newModel: ButtonHelperControls): void {
    this.helperModel = newModel;
  }

  public onGroupModelChange(newModel: ButtonGroupInputControls): void {
    this.groupModel = newModel;
  }

}
