import { ActionMenuDemoService } from './action-menu-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActionMenuTriggerDirective, IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel/overlay-panel.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-menu-demo',
  imports: [
    TryoutComponent,
    IdsActionMenuTriggerDirective,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './action-menu-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './action-menu-demo.component.scss',
  ],
})
export class ActionMenuDemoComponent {
  public demoService = inject(ActionMenuDemoService);
}
