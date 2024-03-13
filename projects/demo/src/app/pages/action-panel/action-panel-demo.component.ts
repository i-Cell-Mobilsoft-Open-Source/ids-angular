import { Component, ViewEncapsulation } from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/widgets/action-item';
import { IdsActionPanelComponent } from '@i-cell/widgets/action-panel';
import { ActionPanelAppearance, ActionPanelAppearanceType, Size, SizeType } from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiChevronRight, mdiMagnify } from '@mdi/js';

@Component({
  selector: 'app-action-panel-demo',
  standalone: true,
  imports: [IdsActionPanelComponent, IdsActionItemComponent, IdsIconComponent],
  templateUrl: './action-panel-demo.component.html',
  styleUrl: './action-panel-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ActionPanelDemoComponent {
  public appearances = Object.values(ActionPanelAppearance) as ActionPanelAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public items = Array(8);
  public mdiSearch = mdiMagnify;
  public mdiChevron = mdiChevronRight;
}
