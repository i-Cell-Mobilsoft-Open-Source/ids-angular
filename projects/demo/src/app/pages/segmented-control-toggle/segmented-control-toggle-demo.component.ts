import { SegmentedControlToggleDemoService } from './segmented-control-toggle-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo',
  imports: [
    TryoutComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    IdsIconComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-toggle-demo.component.scss',
  ],
})
export class SegmentedControlToggleDemoComponent {
  public segmentedControlToggleDemoService = inject(SegmentedControlToggleDemoService);
}
