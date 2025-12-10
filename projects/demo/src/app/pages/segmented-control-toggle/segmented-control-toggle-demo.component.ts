import { SegmentedControlToggleDemoService } from './segmented-control-toggle-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
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
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    PropTableComponent,
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class SegmentedControlToggleDemoComponent {
  protected _segmentedControlToggleDemoService = inject(SegmentedControlToggleDemoService);
}
