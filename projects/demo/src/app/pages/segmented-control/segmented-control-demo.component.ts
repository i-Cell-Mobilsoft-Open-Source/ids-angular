import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlAppearance, IdsSegmentedControlAppearanceType, IdsSegmentedControlVariant, IdsSegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control/segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlDirective } from '@i-cell/ids-angular/segmented-control/segmented-control.directive';
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
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    IdsIconComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrl: './segmented-control-demo.component.scss',
})
export class SegmentedControlDemoComponent {
  protected _inputControlConfig: DemoControlConfig<SegmentedControlInputControls> = {
    size: {
      description: 'Size of the segmented control.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the segmented control.',
      type: 'IdsSegmentedControlVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsSegmentedControlVariant),
    },
    appearance: {
      description: 'Appearance of the segmented control.',
      type: 'IdsSegmentedControlAppearanceType',
      default: defaultConfig.appearance,
      control: 'select',
      list: convertEnumToStringArray(IdsSegmentedControlAppearance),
    },
    disabled: {
      description: 'Whether the segmented control is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  protected _helperControlConfig: DemoControlConfig<SegmentedControlHelperControls> = {
    itemHasLabel: {
      description: 'When true, items have labels.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    itemHasIcon: {
      description: 'When true, items have icon.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    itemHasSuffix: {
      description: 'When true, items have suffix.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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
