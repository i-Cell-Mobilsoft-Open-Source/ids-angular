import { ContentCard } from '../../model/contentCard';
import { ImageComponent } from '../image/image.component';

import { Component, Input } from '@angular/core';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    ImageComponent,
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardMediaDirective,
    IdsCardBodyDirective,
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent implements ContentCard {
  @Input()
  public orientation: 'horizontal' | 'vertical' = 'vertical'; // Default to "vertical";
}
