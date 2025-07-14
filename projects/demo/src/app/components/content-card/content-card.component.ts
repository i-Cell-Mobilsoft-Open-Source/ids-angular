// import { Badge } from '../../model/badge';
import { ContentCardData } from '../../model/contentCardData';
import { SafeHtmlPipe } from '../../shared/pipes/safe-html.pipe';
// import { Image } from '../../model/image';
import { BadgeComponent } from '../badge/badge.component';
import { ImageComponent } from '../image/image.component';

import { Component, computed, input } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    ImageComponent,
    IdsCardComponent,
    IdsCardBodyDirective,
    BadgeComponent,
    IdsButtonComponent,
    SafeHtmlPipe,
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent  {

  public contentCardData = input.required<ContentCardData>();

  public handleButtonClick(url?: string): void {
    if (!url) {
      return;
    }
    window.open(url, '_blank', 'noopener');
  }

  public imageData = computed(() => ({
    transparent: this.contentCardData().imageBGTransparent === true,
  }));
}
