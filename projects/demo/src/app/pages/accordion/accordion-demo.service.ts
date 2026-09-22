import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IDS_ACCORDION_DEFAULT_CONFIG_FACTORY, IdsAccordionAppearance, IdsAccordionAppearanceType, IdsAccordionHeadingLevel, IdsAccordionHeadingLevelType } from '@i-cell/ids-angular/accordion';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

const ACCORDION_DOCS_PATH = 'accordion/accordion.component.docs.json';
const ACCORDION_ITEM_DOCS_PATH = 'accordion/accordion-item/accordion-item.component.docs.json';

const defaultConfig = IDS_ACCORDION_DEFAULT_CONFIG_FACTORY();

type AccordionInputControls = {
  size: IdsSizeType;
  appearance: IdsAccordionAppearanceType;
  headingLevel: IdsAccordionHeadingLevelType;
  summary: string;
  disabled: boolean;
  multi: boolean;
  btnSize: IdsSizeType;
  btnAppearance: IdsButtonAppearanceType;
  btnVariant: IdsButtonVariantType;
  expandBtnLabel: string;
  collapseBtnLabel: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
};

@Injectable()
export class AccordionDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  private _resetSubject = new Subject<void>();
  public reset$ = this._resetSubject.asObservable();

  public readonly inputControlConfig: DemoControlConfig<AccordionInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'size', 'Accordion size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    appearance: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'appearance', 'Accordion appearance.'),
      type: 'IdsAccordionAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsAccordionAppearance),
    },
    headingLevel: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'headingLevel', 'Heading level.'),
      type: 'IdsAccordionHeadingLevelType',
      default: defaultConfig.headingLevel,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsAccordionHeadingLevel),
    },
    summary: {
      description: this._widgetDocs.getDescription(ACCORDION_ITEM_DOCS_PATH, 'summary', 'Summary of accordion'),
      type: 'string',
      default: '-',
      demoDefault: 'Summary text',
    },
    disabled: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'disabled', 'Whether the accordion is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    multi: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'multi', 'Allow multiple accordion items to be open.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    btnSize: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'btnSize', 'Button size.'),
      type: 'IdsSizeType',
      default: defaultConfig.btnSize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    btnAppearance: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'btnAppearance', 'Button appearance.'),
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.btnAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    btnVariant: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'btnVariant', 'Button variant.'),
      type: 'IdsButtonVariantType',
      default: defaultConfig.btnVariant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    expandBtnLabel: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'expandBtnLabel', 'Label for expand all button.'),
      type: 'string',
      default: defaultConfig.expandBtnLabel,
    },
    collapseBtnLabel: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'collapseBtnLabel', 'Label for collapse all button.'),
      type: 'string',
      default: defaultConfig.collapseBtnLabel,
    },
    hasLeadingIcon: {
      description: this._widgetDocs.getDescription(ACCORDION_DOCS_PATH, 'hasLeadingIcon', 'Whether the button has leading icon or not.'),
      type: 'boolean',
      default: defaultConfig.hasLeadingIcon,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: this._widgetDocs.getDescription(
        ACCORDION_DOCS_PATH,
        'hasTrailingIcon',
        'Whether the button has trailing icon or not.',
      ),
      type: 'boolean',
      default: defaultConfig.hasTrailingIcon,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodConfig: DemoMethodConfig = [
    {
      name: 'openAll()',
      description: 'Opens all accordion items.',
      returnType: 'void',
    },
    {
      name: 'closeAll()',
      description: 'Closes all accordion items.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<AccordionInputControls>(this.inputControlConfig);

  public model: AccordionInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this._resetSubject.next();
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.ACCORDION', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }
}

