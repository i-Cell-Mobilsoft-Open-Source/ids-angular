import { OverlayPanelDemoService } from './overlay-panel-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel/overlay-panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-panel-demo',
  imports: [
    TryoutComponent,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './overlay-panel-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './overlay-panel-demo.component.scss',
  ],
})
export class OverlayPanelDemoComponent {
  protected _overlayPanelDemoService = inject(OverlayPanelDemoService);
}
