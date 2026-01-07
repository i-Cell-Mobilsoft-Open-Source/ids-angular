import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MESSAGE_DEFAULT_CONFIG_FACTORY, IdsFormFieldVariantType, IdsMessageVariant } from '@i-cell/ids-angular/forms';

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
  public readonly messageInputControlConfig: DemoControlConfig<MessageInputControls> = {
    size: {
      description: 'Size of the message component.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the message component.',
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
      description: 'Whether the message component is disabled or not.',
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
}
