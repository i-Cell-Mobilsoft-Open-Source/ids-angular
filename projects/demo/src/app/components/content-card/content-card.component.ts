// import { Badge } from '../../model/badge';
import { ContentCard } from '../../model/contentCard';
// import { Image } from '../../model/image';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ImageComponent } from '../image/image.component';

import { Component, Input } from '@angular/core';
import { IdsButtonComponent, IdsButtonGroupComponent } from '@i-cell/ids-angular/button';
import { IdsCardComponent, IdsCardVariantType } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'app-content-card',
  standalone: true,
  imports: [
    ImageComponent,
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardMediaDirective,
    IdsCardBodyDirective,
    BadgeComponent,
    IdsCardFooterDirective,
    IdsButtonComponent,
    IdsButtonGroupComponent,
    IdsIconComponent,
    ButtonsComponent,
  ],
  templateUrl: './content-card.component.html',
  styleUrl: './content-card.component.scss',
})
export class ContentCardComponent  {

  public contentCard: ContentCard = {
    variant: undefined,
    orientation: 'horizontal',
  };

  get safeVariant(): IdsCardVariantType {
    return this.contentCard.variant ?? 'surface'; // Ensuring a default value
  }

  @Input()
  public contentCardData!: ContentCard;

}
