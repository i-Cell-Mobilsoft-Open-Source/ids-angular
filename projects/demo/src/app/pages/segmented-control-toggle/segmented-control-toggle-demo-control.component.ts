import { SegmentedControlToggleDemoService } from './segmented-control-toggle-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo-control',
  imports: [
    TryoutControlComponent,
    FormsModule,
    TranslateModule,
    ControlTableSmallComponent,
  ],
  templateUrl: './segmented-control-toggle-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-toggle-demo.component.scss',
  ],
})
export class SegmentedControlToggleDemoControlComponent {
  public segmentedControlToggleDemoService = inject(SegmentedControlToggleDemoService);
}
