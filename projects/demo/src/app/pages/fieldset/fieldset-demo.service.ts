import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FIELDSET_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/forms';
import { TranslateService } from '@ngx-translate/core';

const FIELDSET_DOCS_PATH = 'forms/components/fieldset/fieldset.component.docs.json';
const FIELDSET_SLOTS_DOCS_PATH = 'forms/components/fieldset/fieldset.component.slots.docs.json';

type FieldsetInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
  legend: string;
};

type FieldsetHelperControls = {
  showMessage: boolean;
};

const defaultConfig = IDS_FIELDSET_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class FieldsetDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<FieldsetInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(FIELDSET_DOCS_PATH, 'size', 'Fieldset size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(FIELDSET_DOCS_PATH, 'variant', 'Fieldset variant.'),
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    legend: {
      description: this._widgetDocs.getDescription(FIELDSET_DOCS_PATH, 'legend', 'Fieldset legend.'),
      type: 'string',
      default: '-',
      demoDefault: 'Personal data',
    },
  };

  public readonly helperControlConfig: DemoControlConfig<FieldsetHelperControls> = {
    showMessage: {
      description: 'Whether to show fieldset message or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<FieldsetInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<FieldsetHelperControls>(this.helperControlConfig);

  public model: FieldsetInputControls = { ...this.defaults };
  public helperModel: FieldsetHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.FIELDSET', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'idsFieldsetMessage',
      selector: '[idsFieldsetMessage]',
      description: this._widgetDocs.getDescription(
        FIELDSET_SLOTS_DOCS_PATH,
        'idsFieldsetMessage',
        'Content projected into the fieldset\'s message area, below the legend (marked with the idsFieldsetMessage attribute).',
      ),
    },
    {
      name: 'row',
      selector: 'ids-fieldset-row',
      description: this._widgetDocs.getDescription(
        FIELDSET_SLOTS_DOCS_PATH,
        'row',
        'Projected <ids-fieldset-row> elements, used to lay out the fieldset\'s form controls in rows.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Fieldset'];
  }
}
