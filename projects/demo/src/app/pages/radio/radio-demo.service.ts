import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsOrientation, IdsOrientationType, IdsPosition, IdsPositionType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsValidators } from '@i-cell/ids-angular/forms';
import { IDS_RADIO_DEFAULT_CONFIG_FACTORY, IdsRadioVariant, IdsRadioVariantType } from '@i-cell/ids-angular/radio';
import { TranslateService } from '@ngx-translate/core';

const RADIO_GROUP_DOCS_PATH = 'radio/radio-group.component.docs.json';
const RADIO_ITEM_DOCS_PATH = 'radio/radio.component.docs.json';
const RADIO_ITEM_SLOTS_DOCS_PATH = 'radio/radio.component.slots.docs.json';
const RADIO_GROUP_SLOTS_DOCS_PATH = 'radio/radio-group.component.slots.docs.json';

const defaultConfig = IDS_RADIO_DEFAULT_CONFIG_FACTORY();

type RadioInputControls = {
  name: string
  required: boolean,
  disabled: boolean,
  size: IdsSizeType,
  variant: IdsRadioVariantType,
  orientation: IdsOrientationType,
  labelPosition: IdsPositionType,
};

type RadioHelperControls = {
  onlyOneItemIsDisabled: boolean,
  allowHint: boolean,
  hintMessage: string,
  showGroupLabel: boolean,
  showGroupHintMessage: boolean,
};

@Injectable()
export class RadioDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public form = new FormGroup({
    selection: new FormControl(null, []),
  });

  public inputControlConfig: DemoControlConfig<RadioInputControls> = {
    name: {
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_DOCS_PATH,
        'name',
        'Name for radio items. Name is provided for group, but items get it.',
      ),
      type: 'string',
      default: '-',
      demoDefault: 'numbers',
    },
    required: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'required', 'Whether the radio is required or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.form.controls.selection.addValidators(IdsValidators.required);
        } else {
          this.form.controls.selection.removeValidators(IdsValidators.required);
        }
        this.form.controls.selection.updateValueAndValidity();
      },
    },
    disabled: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'disabled', 'Whether the radio group is disabled.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isDisabled?: boolean) => {
        if (isDisabled) {
          this.form.controls.selection.disable();
        } else {
          this.form.controls.selection.enable();
        }
      },
    },
    size: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'size', 'Size of the radio.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'variant', 'Variant of the radio.'),
      type: 'IdsRadioVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsRadioVariant),
    },
    orientation: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'orientation', 'Orientation of the radio.'),
      type: 'IdsRadioVariantType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    labelPosition: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'labelPosition', 'Position of the radio\'s label.'),
      type: 'IdsPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPosition),
    },
  };

  public helperControlConfig: DemoControlConfig<RadioHelperControls> = {
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    allowHint: {
      description: 'Allow hint message',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hintMessage: {
      description: 'Hint message',
      type: 'string',
      default: '-',
      demoDefault: 'Hint message',
    },
    showGroupLabel: {
      description: 'Whether to show the label of the radio group or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    showGroupHintMessage: {
      description: 'Whether to show the hint message of the radio group or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public methodControlConfig: DemoMethodConfig = [
    {
      name: 'focus(option?: FocusOption)',
      description: 'Focuses the radio item.',
      returnType: 'void',
      parameters: ['option?'],
      parameterTypes: ['FocusOption'],
      parameterDescriptions: ['The option to focus. If not provided, focuses the first enabled option.'],
    },
  ];

  public readonly groupPropControlConfig: DemoControlConfig<unknown> = {
    groupLabel: {
      description: this._widgetDocs.getDescription(RADIO_GROUP_DOCS_PATH, 'groupLabel', 'Label of the radio group (alias: "label").'),
      type: 'string',
      default: '',
    },
    valueCompareFn: {
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_DOCS_PATH,
        'valueCompareFn',
        'Function used to compare radio items for the purpose of selection matching.',
      ),
      type: '(o1: IdsRadioComponent, o2: IdsRadioComponent) => boolean',
      default: '-',
    },
    itemChanges: {
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_DOCS_PATH,
        'itemChanges',
        'Emitted when the selected radio item changes.',
      ),
      type: 'EventEmitter<IdsRadioChangeEvent>',
      default: '-',
    },
  };

  public readonly itemPropControlConfig: DemoControlConfig<unknown> = {
    inputId: {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'inputId', 'Id of the radio item\'s native input element.'),
      type: 'string',
      default: '-',
    },
    value: {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'value', 'Value of the radio item.'),
      type: 'unknown',
      default: '-',
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'tabIndex', 'Tab index of the radio item.'),
      type: 'number',
      default: 0,
    },
    'aria-label': {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'label', 'aria-label for the radio item.'),
      type: 'string',
      default: '-',
    },
    'aria-labelledby': {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'labelledby', 'aria-labelledby for the radio item.'),
      type: 'string',
      default: '-',
    },
    'aria-describedby': {
      description: this._widgetDocs.getDescription(RADIO_ITEM_DOCS_PATH, 'describedby', 'aria-describedby for the radio item.'),
      type: 'string',
      default: '-',
    },
  };

  public defaults = getDefaultFromDemoConfig<RadioInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<RadioHelperControls>(this.helperControlConfig);

  public model: RadioInputControls = { ...this.defaults };
  public helperModel: RadioHelperControls = { ...this.helperDefaults };

  public simpleValue = undefined;
  public wrappedValue = undefined;

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.form.reset();
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.RADIO', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.itemPropControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.RADIO', 'API.PROPERTY_GROUP.GROUP'),
        config: this.groupPropControlConfig,
      },
    ];
  }

  public readonly itemSlotControlConfig: DemoSlotConfig = [
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        RADIO_ITEM_SLOTS_DOCS_PATH,
        'content',
        'Default content of the radio item, used as its label.',
      ),
    },
    {
      name: 'hintMessage',
      selector: 'ids-hint-message',
      description: this._widgetDocs.getDescription(
        RADIO_ITEM_SLOTS_DOCS_PATH,
        'hintMessage',
        'Projected <ids-hint-message> element, shown below the radio item\'s label when a hint message is set.',
      ),
    },
  ];

  public readonly groupSlotControlConfig: DemoSlotConfig = [
    {
      name: 'hintMessage',
      selector: 'ids-hint-message',
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_SLOTS_DOCS_PATH,
        'hintMessage',
        'Projected <ids-hint-message> element, shown next to the group\'s legend.',
      ),
    },
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_SLOTS_DOCS_PATH,
        'content',
        'Default content of the radio group, i.e. the projected <ids-radio> items.',
      ),
    },
    {
      name: 'errorMessage',
      selector: 'ids-error-message',
      description: this._widgetDocs.getDescription(
        RADIO_GROUP_SLOTS_DOCS_PATH,
        'errorMessage',
        'Projected <ids-error-message> element, shown below the radio list when the group is in an error state.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [
      this.itemSlotControlConfig,
      this.groupSlotControlConfig,
    ];
  }

  public getSlotTitles(): string[] {
    return [
      'Radio',
      'Radio group',
    ];
  }
}
