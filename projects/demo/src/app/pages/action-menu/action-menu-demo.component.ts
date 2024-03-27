import { Component, ViewEncapsulation } from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/widgets/action-item';
import { IdsActionMenuTriggerDirective } from '@i-cell/widgets/action-menu';
import { IdsActionPanelComponent } from '@i-cell/widgets/action-panel';
import { IdsButtonComponent } from '@i-cell/widgets/button';
import { IdsIconComponent } from '@i-cell/widgets/icon';
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
  public items = Array(8);
  public mdiSearch = mdiMagnify;
  public mdiChevronDown = mdiChevronDown;
  public mdiChevronRight = mdiChevronRight;
  public mdiChevronUp = mdiChevronUp;
}
