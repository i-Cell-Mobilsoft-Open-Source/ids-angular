import { SegmentedControlDemoService } from './segmented-control-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-demo.component.scss',
  ],
})
export class SegmentedControlDemoControlComponent {
  public segmentedControlDemoService = inject(SegmentedControlDemoService);
}
