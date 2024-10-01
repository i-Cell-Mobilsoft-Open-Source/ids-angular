import { Component } from '@angular/core';
import { IdsActionMenuTriggerDirective } from '@i-cell/ids-angular/action-menu';
import { IdsActionPanelComponent } from '@i-cell/ids-angular/action-panel';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu-item';
import { mdiChevronDown, mdiChevronRight, mdiChevronUp, mdiMagnify } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-menu-demo',
  standalone: true,
  imports: [
    IdsActionMenuTriggerDirective,
    IdsActionPanelComponent,
    IdsMenuItemComponent,
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './action-menu-demo.component.html',
  styleUrl: './action-menu-demo.component.scss',
})
export class ActionMenuDemoComponent {
  // eslint-disable-next-line no-magic-numbers
  public items = Array(8);
  public mdiSearch = mdiMagnify;
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronRight = mdiChevronRight;
  public mdiChevronUp = mdiChevronUp;
}
