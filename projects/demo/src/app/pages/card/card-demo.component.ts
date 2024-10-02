import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { CardAppearance, CardAppearanceType, IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import {
  AllVariants,
  AllVariantsType,
  Orientation,
  OrientationType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type CardPublicApi = {
  appearance: CardAppearanceType,
  size: SizeType,
  variant: AllVariantsType,
  orientation: OrientationType,
  disabled: boolean,
};

type CardHelperControls = {
  clickable: boolean,
  stretchMedia: boolean
};

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
    IdsButtonComponent,
  ],
  templateUrl: './card-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './card-demo.component.scss',
  ],
})
export class CardDemoComponent {
  public appearances = Object.values(CardAppearance) as CardAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];
  public orientations = Object.values(Orientation) as OrientationType[];

  public defaults: CardPublicApi & CardHelperControls = {
    appearance: CardAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.SURFACE,
    orientation: Orientation.VERTICAL,
    clickable: false,
    disabled: false,
    stretchMedia: true,
  };

  public model: CardPublicApi & CardHelperControls = { ...this.defaults };

  public onClick(): void {
    alert('Click');
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
