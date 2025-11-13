import { ChipDemoService } from './chip-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chip-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './chip-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './chip-demo.component.scss',
  ],
})
export class ChipDemoControlComponent {
  public chipDemoService = inject(ChipDemoService);
}
