import { ContentCardData } from '../../../model/contentCardData';
import { ContentCardComponent } from '../../content-card/content-card.component';

import { Component } from '@angular/core';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';

type ComponentBlock = { type: 'heading'; heading: string } | (ContentCardData & { type: 'card' });

@Component({
  selector: 'app-guidelines',
  imports: [
    IdsChipComponent,
    ContentCardComponent,
  ],
  templateUrl: './guidelines.component.html',
})
export class GuidelinesComponent {
  public componentBlocks: ComponentBlock[] = [];

}
