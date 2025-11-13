import { SideSheetDemoService } from './side-sheet-demo.service';

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
  ],
  templateUrl: './side-sheet-demo.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoComponent {
  public sideSheetService = inject(SideSheetDemoService);
}
