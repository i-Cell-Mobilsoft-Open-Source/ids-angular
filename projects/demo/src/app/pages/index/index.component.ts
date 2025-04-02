import { HERO_DATA } from '../../../utils/heroListData';
import { INDEX_DATA } from '../../../utils/indexListData';
import { HeroComponent } from '../../components/hero/hero.component';

import { Component } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeroComponent,
    IdsCardComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class IndexComponent {
  public indexDatas = INDEX_DATA;
  public heroDatas = HERO_DATA;

}
