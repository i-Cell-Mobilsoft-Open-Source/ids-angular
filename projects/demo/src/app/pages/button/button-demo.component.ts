import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent, IdsButtonAppearance, IdsButtonAppearanceType } from '@i-cell/ids-angular/button';
import {
  IdsBrandVariant,
  IdsBrandVariantType,
  IdsAllVariants,
  IdsAllVariantsType,
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

type ButtonPublicApi = {
  appearance: IdsButtonAppearanceType,
  size: IdsSizeType,
  variant: IdsAllVariantsType,
  disabled: boolean,
};

type ButtonHelperControls = {
  text: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  standalone: true,
  selector: 'app-button-demo',
  imports: [
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './button-demo.component.scss',
  ],
})
export class ButtonDemoComponent {
  public appearances = Object.values<IdsButtonAppearanceType>(IdsButtonAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public baseVariants = Object.values<IdsBrandVariantType>(IdsBrandVariant);
  public variants = Object.values<IdsAllVariantsType>(IdsAllVariants);

  public defaults: ButtonPublicApi & ButtonHelperControls = {
    appearance: IdsButtonAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsAllVariants.PRIMARY,
    disabled: false,
    text: 'Sample button',
    hasLeadingIcon: true,
    hasTrailingIcon: true,
  };

  public model: ButtonPublicApi & ButtonHelperControls = { ...this.defaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
