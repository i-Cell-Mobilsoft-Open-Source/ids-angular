import { DialogDemoService } from './dialog-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
  ],
  templateUrl: './dialog-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './dialog-demo.component.scss',
  ],
})
export class DialogDemoControlComponent {
  public dialogDemoService = inject(DialogDemoService);
}
