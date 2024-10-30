import { IdsTabGroupComponent } from '../../../../../widgets/tabs/tab-group.component';
import { IdsTabItemComponent } from '../../../../../widgets/tabs/tab-item/tab-item.component';

import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs-demo',
  standalone: true,
  imports: [
    IdsTabGroupComponent,
    IdsTabItemComponent,
  ],
  templateUrl: './tabs-demo.component.html',
  styleUrl: './tabs-demo.component.scss',
})
export class TabsDemoComponent {

}
