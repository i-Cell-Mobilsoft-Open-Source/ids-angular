import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSizeType, IdsSize } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { TranslateService } from '@ngx-translate/core';

const OPTION_DOCS_PATH = 'forms/components/option/option.component.docs.json';
const OPTION_GROUP_DOCS_PATH = 'forms/components/option/option-group.component.docs.json';

export type OptionSelectControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
};

export type SampleOptionControls = {
  disabled: boolean;

};

export type MultipleOptionControls = {
  disabled: boolean;
};

type SampleOption = {
  value: string
  viewValue: string
};

type AnimalOptions = {
  land: SampleOption[]
  aquatic: SampleOption[]
};

@Injectable({ providedIn: 'root' })
export class OptionDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly selectControlConfig: DemoControlConfig<OptionSelectControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the form field.',
      type: 'IdsFormFieldVariantType',
      default: IdsFormFieldVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  public readonly sampleInputControlConfig: DemoControlConfig<SampleOptionControls> = {
    disabled: {
      description: this._widgetDocs.getDescription(OPTION_DOCS_PATH, 'disabled', 'Whether the option is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },

  };

  public readonly multipleInputControlConfig: DemoControlConfig<MultipleOptionControls> = {
    disabled: {
      description: this._widgetDocs.getDescription(OPTION_DOCS_PATH, 'disabled', 'Whether the option is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly optionPropControlConfig: DemoControlConfig<unknown> = {
    value: {
      description: this._widgetDocs.getDescription(OPTION_DOCS_PATH, 'value', 'Value of the option.'),
      type: 'T',
      default: '-',
    },
    viewValue: {
      description: this._widgetDocs.getDescription(
        OPTION_DOCS_PATH,
        'viewValue',
        'Explicit display text of the option (alias: "viewValue"). Falls back to the projected content when not set.',
      ),
      type: 'string',
      default: '-',
    },
    selectionChange: {
      description: this._widgetDocs.getDescription(
        OPTION_DOCS_PATH,
        'selectionChange',
        'Emitted when the selection state of the option changes.',
      ),
      type: 'EventEmitter<IdsOptionSelectionChange<T>>',
      default: '-',
    },
    selectionUnchanged: {
      description: this._widgetDocs.getDescription(
        OPTION_DOCS_PATH,
        'selectionUnchanged',
        'Emitted when the option is selected/clicked but the selection state does not change.',
      ),
      type: 'EventEmitter<IdsOptionSelectionChange<T>>',
      default: '-',
    },
  };

  public readonly optionGroupPropControlConfig: DemoControlConfig<unknown> = {
    label: {
      description: this._widgetDocs.getDescription(OPTION_GROUP_DOCS_PATH, 'label', 'Label of the option group.'),
      type: 'string',
      default: '-',
    },
    disabled: {
      description: this._widgetDocs.getDescription(
        OPTION_GROUP_DOCS_PATH,
        'disabled',
        'Whether all options within the option group are disabled or not.',
      ),
      type: 'boolean',
      default: false,
    },
  };

  public readonly optionMethodControls: DemoMethodConfig = [
    {
      name: 'focus(_origin?: FocusOrigin, options?: FocusOptions)',
      description: 'Focuses the option.',
      returnType: 'void',
      parameters: [
        '_origin?',
        'options?',
      ],
      parameterTypes: [
        'FocusOrigin',
        'FocusOptions',
      ],
      parameterDescriptions: [
        'The origin of the focus event.',
        'Additional focus options.',
      ],
    },
    {
      name: 'selectViaInteraction()',
      description: 'Selects the option as if it were selected by the user.',
      returnType: 'void',
    },
    {
      name: 'getHostElement()',
      description: 'Returns the host element of the option.',
      returnType: 'HTMLElement',
    },
    {
      name: 'select(emitEvent=true)',
      description: 'Selects the option.',
      returnType: 'void',
      parameters: ['emitEvent'],
      parameterTypes: ['boolean'],
      parameterDescriptions: ['Whether to emit the selection change event or not.'],
    },
    {
      name: 'deselect(emitEvent=true)',
      description: 'Deselects the option.',
      returnType: 'void',
      parameters: ['emitEvent'],
      parameterTypes: ['boolean'],
      parameterDescriptions: ['Whether to emit the selection change event or not.'],
    },
    {
      name: 'setActiveStyles()',
      description: 'Sets the active styles on the option.',
      returnType: 'void',
    },
    {
      name: 'setInactiveStyles()',
      description: 'Sets the inactive styles on the option.',
      returnType: 'void',
    },
    {
      name: 'getLabel()',
      description: 'Returns the label of the option.',
      returnType: 'string',

    },

  ];

  public selectDefaults = getDefaultFromDemoConfig<OptionSelectControls>(this.selectControlConfig);
  public defaults = getDefaultFromDemoConfig<SampleOptionControls>(this.sampleInputControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<MultipleOptionControls>(this.multipleInputControlConfig);

  public selectModel: OptionSelectControls = { ...this.selectDefaults };
  public sampleOptionModel: SampleOptionControls = { ...this.defaults };
  public multipleSelectionModel: MultipleOptionControls = { ...this.groupDefaults };

  public reset(): void {
    this.selectModel = { ...this.selectDefaults };
    this.sampleOptionModel = { ...this.defaults };
    this.multipleSelectionModel = { ...this.groupDefaults };
  }

  public animals: AnimalOptions = {
    land: [
      { viewValue: 'Dog', value: 'dog' },
      { viewValue: 'Cat', value: 'cat' },
      { viewValue: 'Giraffe', value: 'giraffe' },
      { viewValue: 'Orangutan', value: 'orangutan' },
      { viewValue: 'Mammoth', value: 'mammoth' },
      { viewValue: 'Opisthocoelicaudia Skarzynski', value: 'opisthocoelicaudia skarzynski' },
    ],
    aquatic: [
      { viewValue: 'Crocodile', value: 'crocodile' },
      { viewValue: 'Whale', value: 'whale' },
      { viewValue: 'Dolphin', value: 'doplhin' },
      { viewValue: 'Shark', value: 'shark' },
    ],
  };

  public selectedValue: string | null = null;

  public multiSelectionValue: string[] = [
    this.animals.land[0].value,
    this.animals.land[2].value,
    this.animals.aquatic[1].value,
  ];

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.optionMethodControls];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SELECT', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.selectControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OPTION', 'API.PROPERTY_GROUP.SAMPLE'),
        config: this.sampleInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OPTION', 'API.PROPERTY_GROUP.MULTIPLE'),
        config: this.multipleInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OPTION', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.optionPropControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OPTION', 'API.PROPERTY_GROUP.GROUP'),
        config: this.optionGroupPropControlConfig,
      },
    ];
  }
}
