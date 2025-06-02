import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet/side-sheet.component';

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSideSheetComponent,
  ],
  templateUrl: './side-sheet-demo.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoComponent {
  protected _show = false;
}
