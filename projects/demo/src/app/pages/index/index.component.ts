import { INDEX_DATA } from '../../../utils/indexListData';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeroData } from '../../model/heroData';

import { Component, signal } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
@Component({
  selector: 'app-index',
  imports: [
    HeroComponent,
    IdsCardComponent,
  ],
  templateUrl: './index.component.html',
})
export class IndexComponent {
  public indexDatas = INDEX_DATA;
  public heroData = signal<HeroData>({
    title: 'Welcome to I-DS Design System ',
    description: 'Our design system enables us to create consistent web interfaces.' +
    ' We offer comprehensive design principles, technical documentation, and live examples of components to streamline our workflow.' +
    ' While browsing through the components, you can conveniently copy code snippets to enhance efficiency in your work.' +
    ' Additionally, you can easily access the Figma design file for comparative analysis.' +
    ' Our design system not only assists developers and designers ' +
    'but also provides support for testers and analysts actively involved in the design process.',
    localImageUrl: 'assets/images/illustration/ids-illu-comp-general@2x.png',
    id: 0,
    imageUrl: '',
  });
}
