import { SideSheetDemoService } from './side-sheet-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
  IdsOptionComponent,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActiveIndicatorDirective, IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet/side-sheet.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-demo',
  imports: [
    TryoutComponent,
    IdsSideSheetComponent,
    IdsButtonComponent,
    TranslatePipe,
    NgTemplateOutlet,
    FormsModule,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    IdsSuffixDirective,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    IdsIconComponent,
    OverlayModule,
    CdkMenu,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './side-sheet-demo.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoComponent {
  protected _sideSheetService = inject(SideSheetDemoService);

  protected _applyAddressSuggestion(address: string, city: string, postalCode: string): void {
    this._sideSheetService.shippingAddress = address;
    this._sideSheetService.city = city;
    this._sideSheetService.postalCode = postalCode;
  }
}
