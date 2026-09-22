import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY, IdsTooltipPosition, IdsTooltipPositionType, IdsTooltipTextAlign, IdsTooltipTouchGestures, IdsTooltipVariant, IdsTooltipVariantType } from '@i-cell/ids-angular/tooltip';
import { TranslateService } from '@ngx-translate/core';

const TOOLTIP_DOCS_PATH = 'tooltip/tooltip.directive.docs.json';

type TooltipInputControls = {
  message: string,
  position: IdsTooltipPositionType,
  size: IdsSizeType,
  variant: IdsTooltipVariantType,
  showDelay: number,
  hideDelay: number,
  disabled: boolean,
  touchGestures: IdsTooltipTouchGestures,
  textAlign: IdsTooltipTextAlign,
  showPointer: boolean,
  tooltipClass: string,
  ignoreClipped: boolean,
};

const defaultConfig = IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY();
@Injectable()
export class TooltipDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<TooltipInputControls> = {
    message: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'message', 'The text displayed inside the tooltip.'),
      type: 'string',
      default: '-',

      demoDefault: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      control: DemoControl.TEXT,
    },
    position: {
      description: this._widgetDocs.getDescription(
        TOOLTIP_DOCS_PATH,
        'position',
        'The position of the tooltip relative to the target element.',
      ),
      type: 'IdsTooltipPositionType',
      default: defaultConfig.position,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTooltipPosition),
    },
    size: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'size', 'The size of the tooltip.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'variant', 'The variant or style of the tooltip.'),
      type: 'IdsTooltipVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTooltipVariant),
    },
    showDelay: {
      description: this._widgetDocs.getDescription(
        TOOLTIP_DOCS_PATH,
        'showDelay',
        'The delay (in milliseconds) before the tooltip appears after hovering.',
      ),
      type: 'number',
      default: defaultConfig.showDelay,
      control: DemoControl.TEXT,
    },
    hideDelay: {
      description: this._widgetDocs.getDescription(
        TOOLTIP_DOCS_PATH,
        'hideDelay',
        'The delay (in milliseconds) before the tooltip disappears after losing focus.',
      ),
      type: 'number',
      default: defaultConfig.hideDelay,
      control: DemoControl.TEXT,
    },
    disabled: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'disabled', 'Determines if the tooltip is disabled.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    touchGestures: {
      description: this._widgetDocs.getDescription(
        TOOLTIP_DOCS_PATH,
        'touchGestures',
        'Specifies the touch gestures behavior for the tooltip (auto, on, off).',
      ),
      type: 'IdsTooltipTouchGestures',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'on',
        'off',
      ],
    },
    textAlign: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'textAlign', 'The text alignment inside the tooltip.'),
      type: 'IdsTooltipTextAlign',
      default: 'auto',
      control: DemoControl.SELECT,
      list: [
        'auto',
        'center',
        'left',
        'right',
      ],
    },
    showPointer: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'showPointer', 'Whether to show tooltip pointer or not.'),
      type: 'boolean',
      default: defaultConfig.showPointer,
      control: DemoControl.SWITCH,
    },
    tooltipClass: {
      description: this._widgetDocs.getDescription(TOOLTIP_DOCS_PATH, 'tooltipClass', 'Additional CSS class(es) to apply to the tooltip.'),
      type: 'string',
      default: '',
      control: DemoControl.TEXT,
    },
    ignoreClipped: {
      description: this._widgetDocs.getDescription(
        TOOLTIP_DOCS_PATH,
        'ignoreClipped',
        'Whether to ignore viewport clipping and always show the tooltip at the configured position.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'show()',
      description: 'Shows the tooltip.',
      returnType: 'void',
    },
    {
      name: 'hide()',
      description: 'Hides the tooltip.',
      returnType: 'void',
    },
    {
      name: 'toggle()',
      description: 'Toggles the visibility of the tooltip.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<TooltipInputControls>(this.inputControlConfig);

  public model: TooltipInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.TOOLTIP', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }
}
