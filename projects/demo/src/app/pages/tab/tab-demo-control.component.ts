import { TabDemoService } from './tab-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    ControlTableSmallComponent,
    TryoutControlComponent,
  ],
  templateUrl: './tab-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tab-demo.component.scss',
  ],
})
export class TabsDemoControlComponent {
  public tabDemoService = inject(TabDemoService);
}
