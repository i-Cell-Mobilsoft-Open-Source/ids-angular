import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IDS_SIDE_SHEET_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/side-sheet/side-sheet-defaults';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet/side-sheet.component';
import {
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
  isClosable: boolean;
  isShowFooter: boolean;
  isShowHeader: boolean;
  hasCustomTrigger?: boolean;
};

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslatePipe,
    IdsIconButtonComponent,
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
      description: 'Is side sheet header shown.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
    hasCustomTrigger: {
      description: 'Is side sheet custom trigger shown. (only in inline mode)',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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

}
