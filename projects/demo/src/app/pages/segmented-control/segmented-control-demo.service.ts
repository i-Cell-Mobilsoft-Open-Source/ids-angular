import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlAppearance, IdsSegmentedControlAppearanceType, IdsSegmentedControlVariant, IdsSegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';

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

type SegmentedControlMethodControls = {
  isItemPreSelectedByValue: boolean
};

type SegmentedControlItemMethodControls = {
  onclick: void,
  focus: void,
};

@Injectable()
export class SegmentedControlDemoService {
  public inputControlConfig: DemoControlConfig<SegmentedControlInputControls> = {
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
      control: DemoControl.SWITCH,
    },
  };

  public helperControlConfig: DemoControlConfig<SegmentedControlHelperControls> = {
    itemHasLabel: {
      description: 'When true, items have labels.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    itemHasIcon: {
      description: 'When true, items have icon.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    itemHasSuffix: {
      description: 'When true, items have suffix.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public methodControlConfig: DemoMethodConfig<SegmentedControlMethodControls> = {
    isItemPreSelectedByValue: {
      name: 'isItemPreSelectedByValue(itemValue: unknown): boolean',
      description: 'Checks if the item with the given value is pre-selected.',
      returnType: 'boolean',
      parameters: ['itemValue'],
      parameterTypes: ['unknown'],
      parameterDescriptions: ['The value of the item to check.'],
    },
  };

  public itemMethodControlConfig: DemoMethodConfig<SegmentedControlItemMethodControls> = {
    onclick: {
      name: 'onclick()',
      description: 'Segmented-control-item: Simulates a click on the segmented control item.',
      returnType: 'void',
    },
    focus: {
      name: 'focus(option?: FocusOption)',
      description: 'Segmented-control-item: Focuses the segmented control item.'+
      'Optionally, a focus option can be provided to specify the focus behavior.',
      returnType: 'void',
      parameters: ['option'],
      parameterTypes: ['FocusOption'],
      parameterDescriptions: ['The focus option to specify the focus behavior.'],
    },
  };

  public defaults = getDefaultFromDemoConfig<SegmentedControlInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SegmentedControlHelperControls>(this.helperControlConfig);

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

  public getMethodConfig(): DemoMethodConfig<unknown>[] {
    return [
      this.methodControlConfig,
      this.itemMethodControlConfig,
    ];
  }
}
