import { SelectDemoService } from './select-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    FormsModule,
    TranslateModule,

  ],
  templateUrl: './select-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './select-demo.component.scss',
  ],
})
export class SelectDemoControlComponent {
  public selectDemoService = inject(SelectDemoService);
}
