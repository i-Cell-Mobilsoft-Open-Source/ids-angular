import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MESSAGE_DEFAULT_CONFIG_FACTORY, IdsFormFieldVariantType, IdsMessageVariant } from '@i-cell/ids-angular/forms';
import { TranslateService } from '@ngx-translate/core';

const ERROR_DEFINITION_DOCS_PATH = 'forms/components/message/error-message/error-definition.directive.docs.json';
const MESSAGE_DOCS_PATH = 'forms/directives/message.directive.docs.json';
const MESSAGE_SLOTS_DOCS_PATH = 'forms/directives/message.directive.slots.docs.json';
const defaultConfig = IDS_MESSAGE_DEFAULT_CONFIG_FACTORY();

type MessageInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
};

type MessageHelperControls = {
  hasSuffix: boolean;
  suffix: string;
  isError: boolean;
  isSuccess: boolean;
  message: string;
};

type InputInputControls = {
  disabled: boolean;
};

@Injectable()
export class MessageDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly messageInputControlConfig: DemoControlConfig<MessageInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(MESSAGE_DOCS_PATH, 'size', 'Size of the message component.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(MESSAGE_DOCS_PATH, 'variant', 'Variant of the message component.'),
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant as IdsFormFieldVariantType,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsMessageVariant),
    },
  };

  public readonly messageHelperControlConfig: DemoControlConfig<MessageHelperControls> = {
    hasSuffix: {
      description: 'Whether the message has suffix or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    suffix: {
      description: 'Suffix text of the message.',
      type: 'string',
      default: '-',
      demoDefault: 'Suffix',
    },
    isError: {
      description: 'Whether the message is in error state.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    isSuccess: {
      description: 'Whether the message is in success state.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    message: {
      description: 'Message text content.',
      type: 'string',
      default: '-',
      demoDefault: 'This is a message component.',
    },
  };

  public readonly messageInputControlConfigInput: DemoControlConfig<InputInputControls> = {
    disabled: {
      description: this._widgetDocs.getDescription(MESSAGE_DOCS_PATH, 'disabled', 'Whether the message component is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<MessageInputControls>(this.messageInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<MessageHelperControls>(this.messageHelperControlConfig);
  public inputDefaults = getDefaultFromDemoConfig<InputInputControls>(this.messageInputControlConfigInput);

  public model: MessageInputControls  = { ...this.defaults };
  public helperModel: MessageHelperControls  = { ...this.helperDefaults };
  public inputModel: InputInputControls  = { ...this.inputDefaults };

  public reset(): void {

    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.inputModel = { ...this.inputDefaults };
  }

  public readonly errorDefinitionPropControlConfig: DemoControlConfig<unknown> = {
    code: {
      description: this._widgetDocs.getDescription(
        ERROR_DEFINITION_DOCS_PATH,
        'code',
        'Validation error code associated with the message inside ids-error-def. Required.',
      ),
      type: 'string',
      default: '-',
    },
  };

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MESSAGE', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.messageInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MESSAGE', 'API.PROPERTY_GROUP.INPUT'),
        config: this.messageInputControlConfigInput,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MESSAGE', 'API.PROPERTY_GROUP.ERROR_DEFINITION'),
        config: this.errorDefinitionPropControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'idsMessagePrefix',
      selector: '[idsMessagePrefix]',
      description: this._widgetDocs.getDescription(
        MESSAGE_SLOTS_DOCS_PATH,
        'idsMessagePrefix',
        'Content projected before the message text (marked with the idsMessagePrefix attribute), e.g. an icon.',
      ),
    },
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        MESSAGE_SLOTS_DOCS_PATH,
        'content',
        'Default content of the message, i.e. the message text itself.',
      ),
    },
    {
      name: 'idsMessageSuffix',
      selector: '[idsMessageSuffix]',
      description: this._widgetDocs.getDescription(
        MESSAGE_SLOTS_DOCS_PATH,
        'idsMessageSuffix',
        'Content projected after the message text (marked with the idsMessageSuffix attribute), e.g. a secondary text or action.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Message'];
  }
}
