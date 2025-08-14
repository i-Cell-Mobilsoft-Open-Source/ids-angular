import { COMPONENT_DATA } from '../../../utils/componentListData';
import { ArticleCardComponent } from '../../components/article-card/article-card.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeroData } from '../../model/heroData';

import { Component, signal } from '@angular/core';

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

  public heroData = signal<HeroData>({
    title: 'Components',
    // eslint-disable-next-line @stylistic/js/max-len
    description: 'Here you will find the basic building blocks that you can use to design websites and applications. Components are grouped by category so you can easily find the ones you need. Each component has a short description that shows its functionality and possible uses. The page also contains interactive elements, so you have the opportunity to examine the various states of the components. We also provide copyable source code and style guides so that you can easily implement these components.',
    localImageUrl: 'assets/images/illustration/ids-illu-comp-general@2x.png',
    id: 0,
    imageUrl: '',
    isBackButton: true,
  });
}
