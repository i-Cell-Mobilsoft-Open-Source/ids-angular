import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCardAppearance, IdsCardAppearanceType, IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsCardBodyDirective } from '@i-cell/ids-angular/card/card-body.directive';
import { IdsCardFooterDirective } from '@i-cell/ids-angular/card/card-footer.directive';
import { IdsCardHeaderComponent } from '@i-cell/ids-angular/card/card-header.component';
import { IdsCardMediaDirective } from '@i-cell/ids-angular/card/card-media.directive';
import { IdsCardSubtitleDirective } from '@i-cell/ids-angular/card/card-subtitle.directive';
import { IdsCardTitleDirective } from '@i-cell/ids-angular/card/card-title.directive';
import {
  IdsAllVariants,
  IdsAllVariantsType,
  IdsOrientation,
  IdsOrientationType,
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type CardPublicApi = {
  appearance: IdsCardAppearanceType,
  size: IdsSizeType,
  variant: IdsAllVariantsType,
  orientation: IdsOrientationType,
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
  public appearances = Object.values<IdsCardAppearanceType>(IdsCardAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsAllVariantsType>(IdsAllVariants);
  public orientations = Object.values<IdsOrientationType>(IdsOrientation);

  public defaults: CardPublicApi & CardHelperControls = {
    appearance: IdsCardAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsAllVariants.SURFACE,
    orientation: IdsOrientation.VERTICAL,
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
