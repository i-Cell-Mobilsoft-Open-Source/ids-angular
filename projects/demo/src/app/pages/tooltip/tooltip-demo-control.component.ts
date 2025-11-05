import { TooltipDemoService } from './tooltip-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './tooltip-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tooltip-demo.component.scss',
  ],
})
export class TooltipDemoControlComponent {
  protected _tooltipDemoService = inject(TooltipDemoService);
}
