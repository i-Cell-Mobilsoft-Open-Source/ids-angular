import { FieldsetDemoService } from './fieldset-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fieldset-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
  ],
  templateUrl: './fieldset-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './fieldset-demo.component.scss',
  ],
})
export class FieldsetDemoControlComponent {
  public fieldsetDemoService = inject(FieldsetDemoService);
}
