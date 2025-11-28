import { SideSheetDemoService } from './side-sheet-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { NgTemplateOutlet } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsFormFieldComponent,
  IdsInputDirective, IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet/side-sheet.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo',
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
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './side-sheet-demo.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoComponent {
  public sideSheetService = inject(SideSheetDemoService);
}
