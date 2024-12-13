import { COMPONENT_LIST } from '../../../utils/componentListData';
import { HERO_LIST } from '../../../utils/heroListData';
import { CardComponent } from '../../components/card/card.component';
import { HeroComponent } from '../../components/hero/hero.component';

import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';

@Component({
  standalone: true,
  selector: 'app-components',
  templateUrl: './components.component.html',
  imports: [
    HeroComponent,
    CardComponent,
    IdsCardComponent,
  ],
})
export class ComponentsComponent {
  public componentLists = COMPONENT_LIST;
  public heroLists = HERO_LIST;
}
