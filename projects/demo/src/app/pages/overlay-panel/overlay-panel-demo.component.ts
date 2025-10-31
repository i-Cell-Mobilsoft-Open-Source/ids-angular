import { OverlayPanelDemoService } from './overlay-panel-demo.service';

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
  ],
  templateUrl: './overlay-panel-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './overlay-panel-demo.component.scss',
  ],
})
export class OverlayPanelDemoComponent {
  public overlayPanelDemoService = inject(OverlayPanelDemoService);
}
