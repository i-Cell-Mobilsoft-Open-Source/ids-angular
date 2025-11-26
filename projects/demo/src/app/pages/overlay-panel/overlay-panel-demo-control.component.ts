import { OverlayPanelDemoService } from './overlay-panel-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-panel-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './overlay-panel-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './overlay-panel-demo.component.scss',
  ],
})
export class OverlayPanelDemoControlComponent {
  public overlayPanelDemoService = inject(OverlayPanelDemoService);
}
