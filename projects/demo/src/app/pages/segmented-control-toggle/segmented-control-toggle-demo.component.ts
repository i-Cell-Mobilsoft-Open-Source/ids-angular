import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlToggleAppearance, IdsSegmentedControlToggleAppearanceType, IdsSegmentedControlToggleButtonVariant, IdsSegmentedControlToggleButtonVariantType, IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent, IdsSegmentedControlToggleVariant, IdsSegmentedControlToggleVariantType } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY();

type SegmentedControlToggleInputControls = {
  size: IdsSizeType,
  variant: IdsSegmentedControlToggleVariantType,
  buttonVariant: IdsSegmentedControlToggleButtonVariantType,
  appearance: IdsSegmentedControlToggleAppearanceType,
  disabled: boolean,
};

type SegmentedControlToggleHelperControls = {
  itemHasLabel: boolean,
  itemHasIcon: boolean,
  itemHasSuffix: boolean,
  onlyOneItemIsDisabled: boolean,
};

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    IdsIconComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-toggle-demo.component.scss',
  ],
})
export class SegmentedControlToggleDemoComponent {
  protected _inputControlConfig: DemoControlConfig<SegmentedControlToggleInputControls> = {
    size: {
      description: 'Size of the segmented control toggle.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the segmented control toggle.',
      type: 'IdsSegmentedControlToggleVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlToggleVariant),
    },
    buttonVariant: {
      description: 'Variant of the segmented control toggle buttons.',
      type: 'IdsSegmentedControlToggleButtonVariantType',
      default: defaultConfig.buttonVariant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlToggleButtonVariant),
    },
    appearance: {
      description: 'Appearance of the segmented control toggle.',
      type: 'IdsSegmentedControlToggleAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlToggleAppearance),
    },
    disabled: {
      description: 'Whether the segmented control toggle is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _helperControlConfig: DemoControlConfig<SegmentedControlToggleHelperControls> = {
    itemHasLabel: {
      description: 'When true, items have labels.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    itemHasIcon: {
      description: 'When true, items have icon.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    itemHasSuffix: {
      description: 'When true, items have suffix.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public defaults = getDefaultFromDemoConfig<SegmentedControlToggleInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SegmentedControlToggleHelperControls>(this._helperControlConfig);

  public model: SegmentedControlToggleInputControls = { ...this.defaults };
  public helperModel: SegmentedControlToggleHelperControls = { ...this.helperDefaults };

  public value = undefined;

  public reset(): void {
    this.value = undefined;
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
