import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCardComponent } from '@i-cell/widgets/card';
import { IdsCardBodyDirective } from '@i-cell/widgets/card/ids-card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/widgets/card/ids-card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/widgets/card/ids-card-header.component';
import { IdsCardMediaDirective } from '@i-cell/widgets/card/ids-card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/widgets/card/ids-card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/widgets/card/ids-card-title.directive';
import {
  AllVariants,
  AllVariantsType,
  CardAppearance,
  CardAppearanceType,
  Orientation,
  OrientationType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';

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
  ],
  templateUrl: './card-demo.component.html',
  styleUrl: './card-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class CardDemoComponent {
  public appearances = Object.values(CardAppearance) as CardAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];
  public orientations = Object.values(Orientation) as OrientationType[];

  public model: {
    appearance: CardAppearanceType;
    size: SizeType;
    variant: AllVariantsType;
    orientation: OrientationType;
    clickable: boolean;
    disabled: string | boolean;
    stretchMedia: boolean;
  } = {
    appearance: 'filled',
    size: 'comfortable',
    variant: 'surface',
    orientation: 'vertical',
    clickable: false,
    disabled: false,
    stretchMedia: true,
  };

  onClick() {
    alert('Click');
  }
}
