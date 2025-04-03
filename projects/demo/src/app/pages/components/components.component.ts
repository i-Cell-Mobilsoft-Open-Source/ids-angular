import { COMPONENT_DATA } from '../../../utils/componentListData';
import { HERO_DATA } from '../../../utils/heroListData';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { HeroComponent } from '../../components/hero/hero.component';

import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-components',
  templateUrl: './components.component.html',
  imports: [
    HeroComponent,
    ArticleCardComponent,
  ],
})
export class ComponentsComponent {
  public componentDatas = COMPONENT_DATA;
  public heroDatas = HERO_DATA;
}
