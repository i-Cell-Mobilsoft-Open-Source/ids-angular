import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY, IdsBackdropType, IdsBackdropTypeType, IdsSideSheetHeader, IdsSideSheetHeaderType, IdsSideSheetPosition, IdsSideSheetPositionType, IdsSideSheetType } from '@i-cell/ids-angular/side-sheet';

const defaultConfig = IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY();

type SideSheetInputControls = {
  type: string;
  title: string;
  position: IdsSideSheetPositionType | string;
  header: IdsSideSheetHeaderType;
  backButton: boolean;
  isScrollable: boolean;
  isBackdrop: boolean;
  backdropType: IdsBackdropTypeType;
  backdropOpacity: IdsSizeType;
  isClosable: boolean;
  isShowFooter: boolean;
  isShowHeader: boolean;
  closeTooltipText: string;
  size: string;
};
@Injectable()
export class SideSheetDemoService {
  protected _idsSideSheetType = IdsSideSheetType;
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;

  private readonly _location = inject(Location);

  public inputControlConfig: DemoControlConfig<SideSheetInputControls> = {
    size: {
      description: 'Side sheet size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    type: {
      description: 'Side sheet type.',
      type: 'IdsSideSheetType',
      default: defaultConfig.type,
      list: Object.values(IdsSideSheetType),
      control: 'select',
    },
    title: {
      description: 'Side sheet title.',
      type: 'string',
      default: 'Title',
      control: 'text',
    },
    position: {
      description: 'Side sheet position.',
      type: 'IdsSideSheetPosition',
      default: defaultConfig.position,
      list: Object.values(IdsSideSheetPosition),
      control: 'select',
    },
    header: {
      description: 'Side sheet header.',
      type: 'IdsSideSheetHeader',
      default: defaultConfig.header,
      list: Object.values(IdsSideSheetHeader),
      control: 'select',
    },
    backButton: {
      description: 'Is side sheet back button shown. Only applies to default header.',
      type: 'boolean',
      default: false,
      control: 'switch',
    },
    isScrollable: {
      description: 'Is side sheet scrollable.',
      type: 'boolean',
      default: defaultConfig.isScrollable,
      control: 'switch',
    },
    isBackdrop: {
      description: 'Is side sheet backdrop enabled.',
      type: 'boolean',
      default: defaultConfig.isBackdrop,
      control: 'switch',
    },
    backdropType: {
      description: 'Backdrop type.',
      type: 'IdsBackdropType',
      default: defaultConfig.backdropType,
      list: Object.values(IdsBackdropType),
      control: 'select',
    },
    backdropOpacity: {
      description: 'Backdrop opacity.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      list: Object.values(IdsSize),
      control: 'select',
    },
    isClosable: {
      description: 'Is side sheet closable.',
      type: 'boolean',
      default: defaultConfig.isClosable,
      control: 'switch',
    },
    isShowFooter: {
      description: 'Is side sheet footer shown.',
      type: 'boolean',
      default: defaultConfig.isShowFooter,
      control: 'switch',
    },
    isShowHeader: {
      description: 'Controls the visibility of the header. Applies only when using the default header type.',
      type: 'boolean',
      default: true,
      control: 'switch',
    },
    closeTooltipText: {
      description: 'Tooltip text for the close button.',
      type: 'string',
      default: defaultConfig.closeTooltipText,
      control: 'text',
    },
  };

  public defaults = getDefaultFromDemoConfig<SideSheetInputControls>(this.inputControlConfig);

  public model: SideSheetInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public onBackButtonClick(): void {
    this._location.back();
  }

  public show = false;

  public firstName = '';
  public lastName = '';
  public email = '';
  public phoneNumber = '';
  public shippingAddress = '';
  public city = '';
  public postalCode = '';

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }
}
