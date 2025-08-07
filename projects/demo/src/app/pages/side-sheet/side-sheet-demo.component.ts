import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Location, NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IdsFormFieldComponent,
  IdsInputDirective, IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/side-sheet/side-sheet-defaults';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet/side-sheet.component';
import {
  IdsBackdropType,
  IdsBackdropTypeType,
  IdsSideSheetHeader, IdsSideSheetHeaderType,
  IdsSideSheetPosition, IdsSideSheetPositionType,
  IdsSideSheetType,
} from '@i-cell/ids-angular/side-sheet/types/side-sheet.type';
import { TranslatePipe } from '@ngx-translate/core';

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

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslatePipe,
    NgTemplateOutlet,
    FormsModule,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsIconComponent,
  ],
  templateUrl: './side-sheet-demo.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoComponent {

  protected _idsSideSheetType = IdsSideSheetType;
  protected _idsSideSheetHeaderType = IdsSideSheetHeader;

  private readonly _location = inject(Location);

  protected _inputControlConfig: DemoControlConfig<SideSheetInputControls> = {
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
      control: 'checkbox',
    },
    isScrollable: {
      description: 'Is side sheet scrollable.',
      type: 'boolean',
      default: defaultConfig.isScrollable,
      control: 'checkbox',
    },
    isBackdrop: {
      description: 'Is side sheet backdrop enabled.',
      type: 'boolean',
      default: defaultConfig.isBackdrop,
      control: 'checkbox',
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
      control: 'checkbox',
    },
    isShowFooter: {
      description: 'Is side sheet footer shown.',
      type: 'boolean',
      default: defaultConfig.isShowFooter,
      control: 'checkbox',
    },
    isShowHeader: {
      description: 'Controls the visibility of the header. Applies only when using the default header type.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    closeTooltipText: {
      description: 'Tooltip text for the close button.',
      type: 'string',
      default: defaultConfig.closeTooltipText,
      control: 'text',
    },
  };

  public defaults = getDefaultFromDemoConfig<SideSheetInputControls>(this._inputControlConfig);

  public model: SideSheetInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public onBackButtonClick(): void {
    this._location.back();
  }

  protected _show = false;

  protected _firstName = '';
  protected _lastName = '';
  protected _email = '';
  protected _phoneNumber = '';
  protected _shippingAddress = '';
  protected _city = '';
  protected _postalCode = '';

}
