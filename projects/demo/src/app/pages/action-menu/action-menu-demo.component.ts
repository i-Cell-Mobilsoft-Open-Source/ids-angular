import { Component, ViewEncapsulation } from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/ids-angular/action-item';
import { IdsActionMenuTriggerDirective } from '@i-cell/ids-angular/action-menu';
import { IdsActionPanelComponent } from '@i-cell/ids-angular/action-panel';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiChevronDown, mdiChevronRight, mdiChevronUp, mdiMagnify } from '@mdi/js';

@Component({
  selector: 'app-action-menu-demo',
  standalone: true,
  imports: [
    IdsActionMenuTriggerDirective,
    IdsActionPanelComponent,
    IdsActionItemComponent,
    IdsButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './action-menu-demo.component.html',
  styleUrl: './action-menu-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ActionMenuDemoComponent {
  // eslint-disable-next-line no-magic-numbers
  public items = Array(8);
  public mdiSearch = mdiMagnify;
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronRight = mdiChevronRight;
  public mdiChevronUp = mdiChevronUp;
}
