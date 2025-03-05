import { CONTENTCARD_LIST } from '../../../utils/contentCardListData';
import { HERO_LIST } from '../../../utils/heroListData';
import { INDEX_LIST } from '../../../utils/indexListData';
import { CardComponent } from '../../components/card/card.component';
import { ContentCardComponent } from '../../components/content-card/content-card.component';
import { HeroComponent } from '../../components/hero/hero.component';

import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeroComponent,
    CardComponent,
    IdsCardComponent,
    ContentCardComponent,
    IdsTabComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  public indexLists = INDEX_LIST;
  public heroLists = HERO_LIST;
  public contentCardLists = CONTENTCARD_LIST;

}
