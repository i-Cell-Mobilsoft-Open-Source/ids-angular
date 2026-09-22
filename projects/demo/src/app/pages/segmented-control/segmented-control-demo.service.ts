import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlAppearance, IdsSegmentedControlAppearanceType, IdsSegmentedControlVariant, IdsSegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { TranslateService } from '@ngx-translate/core';

const SEGMENTED_CONTROL_DOCS_PATH = 'segmented-control/segmented-control.directive.docs.json';
const SEGMENTED_CONTROL_ITEM_DOCS_PATH = 'segmented-control/segmented-control-item.component.docs.json';
const defaultConfig = IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY();

type SegmentedControlInputControls = {
  size: IdsSizeType,
  variant: IdsSegmentedControlVariantType,
  appearance: IdsSegmentedControlAppearanceType,
  showActiveIcon: boolean,
};

type SegmentedControlHelperControls = {
  itemHasLabel: boolean,
  itemHasIcon: boolean,
  itemHasSuffix: boolean,
  onlyOneItemIsDisabled: boolean,
  disabled: boolean,
};

@Injectable()
export class SegmentedControlDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public inputControlConfig: DemoControlConfig<SegmentedControlInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_DOCS_PATH, 'size', 'Size of the segmented control.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_DOCS_PATH, 'variant', 'Variant of the segmented control.'),
      type: 'IdsSegmentedControlVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlVariant),
    },
    appearance: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_DOCS_PATH, 'appearance', 'Appearance of the segmented control.'),
      type: 'IdsSegmentedControlAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSegmentedControlAppearance),
    },
    showActiveIcon: {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_DOCS_PATH,
        'showActiveIcon',
        'Whether the active icon should be shown or not.',
      ),
      type: 'boolean',
      default: true,
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
    disabled: {
      description: 'Whether the segmented control is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public methodControlConfig: DemoMethodConfig= [
    {
      name: 'isItemPreSelectedByValue(itemValue: unknown): boolean',
      description: 'Checks if the item with the given value is pre-selected.',
      returnType: 'boolean',
      parameters: ['itemValue'],
      parameterTypes: ['unknown'],
      parameterDescriptions: ['The value of the item to check.'],
    },
  ];

  public itemMethodControlConfig: DemoMethodConfig = [
    {
      name: 'onclick()',
      description: 'Simulates a click on the segmented control item.',
      returnType: 'void',
    },
    {
      name: 'focus(option?: FocusOption)',
      description: 'Focuses the segmented control item.'+
      'Optionally, a focus option can be provided to specify the focus behavior.',
      returnType: 'void',
      parameters: ['option'],
      parameterTypes: ['FocusOption'],
      parameterDescriptions: ['The focus option to specify the focus behavior.'],
    },
  ];

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    name: {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_DOCS_PATH,
        'name',
        'Name of the segmented control, used for form submission.',
      ),
      type: 'string',
      default: '-',
    },
    multiSelect: {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_DOCS_PATH,
        'multiSelect',
        'Whether the segmented control allows selecting multiple items at once.',
      ),
      type: 'boolean',
      default: false,
    },
  };

  public readonly itemPropControlConfig: DemoControlConfig<unknown> = {
    name: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_ITEM_DOCS_PATH, 'name', 'Name of the segmented control item.'),
      type: 'string',
      default: '-',
    },
    label: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_ITEM_DOCS_PATH, 'label', 'Label of the segmented control item.'),
      type: 'string',
      default: '-',
    },
    value: {
      description: this._widgetDocs.getDescription(SEGMENTED_CONTROL_ITEM_DOCS_PATH, 'value', 'Value of the segmented control item.'),
      type: 'unknown',
      default: '-',
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_ITEM_DOCS_PATH,
        'tabIndex',
        'Tab index of the segmented control item.',
      ),
      type: 'number',
      default: 0,
    },
    'aria-label': {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_ITEM_DOCS_PATH,
        'ariaLabel',
        'aria-label for the segmented control item.',
      ),
      type: 'string',
      default: '-',
    },
    'aria-labeledby': {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_ITEM_DOCS_PATH,
        'labeledby',
        'aria-labeledby for the segmented control item.',
      ),
      type: 'string',
      default: '-',
    },
    changes: {
      description: this._widgetDocs.getDescription(
        SEGMENTED_CONTROL_ITEM_DOCS_PATH,
        'changes',
        'Emitted when the selection state of the item changes.',
      ),
      type: 'EventEmitter<IdsSegmentedControlItemChange>',
      default: '-',
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

  public getMethodConfig(): DemoMethodConfig[] {
    return [
      this.methodControlConfig,
      this.itemMethodControlConfig,
    ];
  }

  public getMethodTitles(): string[] {
    return [
      'Segmented Control Methods',
      'Segmented Control Item Methods',
    ];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SEGMENTED_CONTROL', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig, ...this.itemPropControlConfig },
      },
    ];
  }
}
