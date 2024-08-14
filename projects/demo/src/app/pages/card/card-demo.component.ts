import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardAppearance, CardAppearanceType, IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/ids-card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/ids-card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/ids-card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/ids-card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/ids-card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/ids-card-title.directive';
import {
  AllVariants,
  AllVariantsType,
  Orientation,
  OrientationType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-demo',
  standalone: true,
  imports: [
    IdsCardComponent,
    IdsCardHeaderComponent,
    IdsCardBodyDirective,
    IdsCardMediaDirective,
    IdsCardFooterDirective,
    IdsCardTitleDirective,
    IdsCardSubtitleDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './card-demo.component.html',
  styleUrl: './card-demo.component.scss',
})
export class CardDemoComponent {
  public appearances = Object.values(CardAppearance) as CardAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];
  public orientations = Object.values(Orientation) as OrientationType[];

  public model: {
    appearance: CardAppearanceType
    size: SizeType
    variant: AllVariantsType
    orientation: OrientationType
    clickable: boolean
    disabled: string | boolean
    stretchMedia: boolean
  } = {
      appearance: 'filled',
      size: 'comfortable',
      variant: 'surface',
      orientation: 'vertical',
      clickable: false,
      disabled: false,
      stretchMedia: true,
    };

  public onClick(): void {
    alert('Click');
  }
}
