import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlToggleAppearance, IdsSegmentedControlToggleAppearanceType, IdsSegmentedControlToggleButtonVariant, IdsSegmentedControlToggleButtonVariantType, IdsSegmentedControlToggleVariant, IdsSegmentedControlToggleVariantType } from '@i-cell/ids-angular/segmented-control-toggle';

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

type SegmentedControlToggleMethodControls = {
  isItemPreSelectedByValue: boolean
};

type SegmentedControlToggleItemMethodControls = {
  onclick: void,
  focus: void,
};

@Injectable()
export class SegmentedControlToggleDemoService {
  public readonly inputControlConfig: DemoControlConfig<SegmentedControlToggleInputControls> = {
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
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<SegmentedControlToggleHelperControls> = {
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

  public readonly methodControlConfig: DemoMethodConfig<SegmentedControlToggleMethodControls> = {
    isItemPreSelectedByValue: {
      name: 'isItemPreSelectedByValue(itemValue: unknown): boolean',
      description: 'Checks if the item with the given value is pre-selected.',
      returnType: 'boolean',
      parameters: ['itemValue'],
      parameterTypes: ['unknown'],
      parameterDescriptions: ['The value of the item to check.'],
    },
  };

  public readonly itemMethodControlConfig: DemoMethodConfig<SegmentedControlToggleItemMethodControls> = {
    onclick: {
      name: 'onclick()',
      description: 'Segmented-control-toggle-item: Simulates a click on the segmented control toggle item.',
      returnType: 'void',
    },
    focus: {
      name: 'focus(option?: FocusOption)',
      description: 'Segmented-control-toggle-item: Focuses the segmented control toggle item.'+
      'Optionally, a focus option can be provided to specify the focus behavior.',
      returnType: 'void',
      parameters: ['option'],
      parameterTypes: ['FocusOption'],
      parameterDescriptions: ['The focus option to specify the focus behavior.'],
    },
  };

  public defaults = getDefaultFromDemoConfig<SegmentedControlToggleInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SegmentedControlToggleHelperControls>(this.helperControlConfig);

  public model: SegmentedControlToggleInputControls = { ...this.defaults };
  public helperModel: SegmentedControlToggleHelperControls = { ...this.helperDefaults };

  public value = undefined;

  public reset(): void {
    this.value = undefined;
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
