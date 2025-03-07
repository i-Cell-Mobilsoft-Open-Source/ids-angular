import { IdsTabGroupComponent } from '../../../../../../widgets/tab/tab-group.component';
import { HERO_LIST } from '../../../../utils/componentHeroListData';
import { CONTENTCARD_DATA } from '../../../../utils/contentCardListData';
import { ContentCardComponent } from '../../../components/content-card/content-card.component';
import { HeroComponent } from '../../../components/hero/hero.component';

import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';

@Component({
  selector: 'app-one-component',
  standalone: true,
  imports: [
    HeroComponent,
    IdsCardComponent,
    ContentCardComponent,
    IdsTabComponent,
    IdsTabGroupComponent,
    IdsChipComponent,
    IdsButtonComponent,
  ],
  templateUrl: './one-component.component.html',
  styleUrl: './one-component.component.scss',
})
export class OneComponentComponent {
  public heroLists = HERO_LIST;
  public contentCardDatas = CONTENTCARD_DATA;
}
