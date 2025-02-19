import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlAppearance, IdsSegmentedControlAppearanceType, IdsSegmentedControlDirective, IdsSegmentedControlItemComponent, IdsSegmentedControlVariant, IdsSegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY();

type SegmentedControlInputControls = {
  size: IdsSizeType,
  variant: IdsSegmentedControlVariantType,
  appearance: IdsSegmentedControlAppearanceType,
  disabled: boolean,
};

type SegmentedControlHelperControls = {
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
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    IdsIconComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-demo.component.scss',
  ],
})
export class SegmentedControlDemoComponent {
  protected _inputControlConfig: DemoControlConfig<SegmentedControlInputControls> = {
    size: {
      description: 'Size of the segmented control.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the segmented control.',
      type: 'IdsSegmentedControlVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlVariant),
    },
    appearance: {
      description: 'Appearance of the segmented control.',
      type: 'IdsSegmentedControlAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlAppearance),
    },
    disabled: {
      description: 'Whether the segmented control is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _helperControlConfig: DemoControlConfig<SegmentedControlHelperControls> = {
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

  public defaults = getDefaultFromDemoConfig<SegmentedControlInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SegmentedControlHelperControls>(this._helperControlConfig);

  public model: SegmentedControlInputControls = { ...this.defaults };
  public helperModel: SegmentedControlHelperControls = { ...this.helperDefaults };

  public singleSelectionValue = undefined;
  public multiSelectionValue = [];

  public reset(): void {
    this.singleSelectionValue = undefined;
    this.multiSelectionValue = [];
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
