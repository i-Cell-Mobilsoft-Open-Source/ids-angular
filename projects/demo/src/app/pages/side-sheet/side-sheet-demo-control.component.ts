import { SideSheetDemoService } from './side-sheet-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-segmented-control-demo-control',
  imports: [
    FormsModule,
    ControlTableSmallComponent,
    TryoutControlComponent,
  ],
  templateUrl: './side-sheet-demo-control.component.html',
  styleUrls: ['./side-sheet-demo.component.scss'],
})
export class SideSheetDemoControlControlComponent {
  public sideSheetService = inject(SideSheetDemoService);
}
