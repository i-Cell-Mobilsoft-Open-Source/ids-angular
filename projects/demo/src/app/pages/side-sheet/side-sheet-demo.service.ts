import { WidgetDocsService } from '../../services/widget-docs.service';

import { Location } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY, IdsBackdropType, IdsBackdropTypeType, IdsSideSheetHeader, IdsSideSheetHeaderType, IdsSideSheetPosition, IdsSideSheetPositionType, IdsSideSheetType } from '@i-cell/ids-angular/side-sheet';
import { TranslateService } from '@ngx-translate/core';

const SIDE_SHEET_DOCS_PATH = 'side-sheet/side-sheet.component.docs.json';
const SIDE_SHEET_SLOTS_DOCS_PATH = 'side-sheet/side-sheet.component.slots.docs.json';

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
  isShowHeader: boolean;
  closeTooltipText: string;
  size: string;
};

type SideSheetHelperControls = {
  isShowFooter: boolean;
};
@Injectable()
export class SideSheetDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  protected _idsSideSheetType = IdsSideSheetType;
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;

  private readonly _location = inject(Location);

  public inputControlConfig: DemoControlConfig<SideSheetInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'size', 'Side sheet size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    type: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'type', 'Side sheet type.'),
      type: 'IdsSideSheetType',
      default: defaultConfig.type,
      list: Object.values(IdsSideSheetType),
      control: 'select',
    },
    title: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'title', 'Side sheet title.'),
      type: 'string',
      default: 'Title',
      control: 'text',
    },
    position: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'position', 'Side sheet position.'),
      type: 'IdsSideSheetPosition',
      default: defaultConfig.position,
      list: Object.values(IdsSideSheetPosition),
      control: 'select',
    },
    header: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'header', 'Side sheet header.'),
      type: 'IdsSideSheetHeader',
      default: defaultConfig.header,
      list: Object.values(IdsSideSheetHeader),
      control: 'select',
    },
    backButton: {
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_DOCS_PATH,
        'backButton',
        'Is side sheet back button shown. Only applies to default header.',
      ),
      type: 'boolean',
      default: false,
      control: 'switch',
    },
    isScrollable: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'isScrollable', 'Is side sheet scrollable.'),
      type: 'boolean',
      default: defaultConfig.isScrollable,
      control: 'switch',
    },
    isBackdrop: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'isBackdrop', 'Is side sheet backdrop enabled.'),
      type: 'boolean',
      default: defaultConfig.isBackdrop,
      control: 'switch',
    },
    backdropType: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'backdropType', 'Backdrop type.'),
      type: 'IdsBackdropType',
      default: defaultConfig.backdropType,
      list: Object.values(IdsBackdropType),
      control: 'select',
    },
    backdropOpacity: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'backdropOpacity', 'Backdrop opacity.'),
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      list: Object.values(IdsSize),
      control: 'select',
    },
    isClosable: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'isClosable', 'Is side sheet closable.'),
      type: 'boolean',
      default: defaultConfig.isClosable,
      control: 'switch',
    },
    isShowHeader: {
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_DOCS_PATH,
        'isShowHeader',
        'Controls the visibility of the header. Applies only when using the default header type.',
      ),
      type: 'boolean',
      default: true,
      control: 'switch',
    },
    closeTooltipText: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'closeTooltipText', 'Tooltip text for the close button.'),
      type: 'string',
      default: defaultConfig.closeTooltipText,
      control: 'text',
    },
  };

  public helperControlConfig: DemoControlConfig<SideSheetHelperControls> = {
    isShowFooter: {
      description: 'Is side sheet footer shown.',
      type: 'boolean',
      default: defaultConfig.isShowFooter,
      control: 'switch',
    },
  };

  public defaults = getDefaultFromDemoConfig<SideSheetInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SideSheetHelperControls>(this.helperControlConfig);

  public model: SideSheetInputControls = { ...this.defaults };
  public helperModel: SideSheetHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.phoneNumber = '';
    this.shippingAddress = '';
    this.city = '';
    this.postalCode = '';
    this.country = null;
    this.deliveryDate = null;
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
  public country: string | null = null;
  public deliveryDate: Date | null = null;

  public readonly countries = [
    { value: 'hu', viewValue: 'SIDE_SHEET.COUNTRY.HU' },
    { value: 'uk', viewValue: 'SIDE_SHEET.COUNTRY.UK' },
    { value: 'de', viewValue: 'SIDE_SHEET.COUNTRY.DE' },
    { value: 'fr', viewValue: 'SIDE_SHEET.COUNTRY.FR' },
    { value: 'us', viewValue: 'SIDE_SHEET.COUNTRY.US' },
  ];

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    open: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'open', 'Whether the side sheet is open or not.'),
      type: 'boolean',
      default: false,
    },
    closed: {
      description: this._widgetDocs.getDescription(SIDE_SHEET_DOCS_PATH, 'closed', 'Emitted when the side sheet is closed.'),
      type: 'EventEmitter<void>',
      default: '-',
    },
    backClicked: {
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_DOCS_PATH,
        'backClicked',
        'Emitted when the back button (in the default header) is clicked.',
      ),
      type: 'EventEmitter<void>',
      default: '-',
    },
  };

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SIDE_SHEET', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_SLOTS_DOCS_PATH,
        'content',
        'Default content of the side sheet, rendered in the scrollable content area.',
      ),
    },
    {
      name: 'customHeader',
      selector: '[slot="customHeader"]',
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_SLOTS_DOCS_PATH,
        'customHeader',
        'Content projected into the header area (marked with slot="customHeader") when the header input is set to "custom".',
      ),
    },
    {
      name: 'footer',
      selector: '[slot="footer"]',
      description: this._widgetDocs.getDescription(
        SIDE_SHEET_SLOTS_DOCS_PATH,
        'footer',
        'Content projected into the footer area of the side sheet (marked with slot="footer"), typically action buttons.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Side sheet'];
  }
}
