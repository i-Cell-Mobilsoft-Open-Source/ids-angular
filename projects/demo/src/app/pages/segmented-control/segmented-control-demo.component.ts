import { SegmentedControlDemoService } from './segmented-control-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    IdsIconComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-demo.component.scss',
  ],
})
export class SegmentedControlDemoComponent {
  public segmentedControlDemoService = inject(SegmentedControlDemoService);
}
