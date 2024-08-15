import { Component } from '@angular/core';
import { IdsActionItemComponent } from '@i-cell/ids-angular/action-item';
import { IdsActionPanelComponent, ActionPanelAppearance, ActionPanelAppearanceType } from '@i-cell/ids-angular/action-panel';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiChevronRight, mdiMagnify } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-panel-demo',
  standalone: true,
  imports: [
    IdsActionPanelComponent,
    IdsActionItemComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './action-panel-demo.component.html',
  styleUrl: './action-panel-demo.component.scss',
})
export class ActionPanelDemoComponent {
  public appearances = Object.values(ActionPanelAppearance) as ActionPanelAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  // eslint-disable-next-line no-magic-numbers
  public items = Array(8);
  public mdiSearch = mdiMagnify;
  public mdiChevron = mdiChevronRight;
}
