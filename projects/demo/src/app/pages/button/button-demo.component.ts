import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent, ButtonAppearance, ButtonAppearanceType } from '@i-cell/ids-angular/button';
import {
  BrandVariant,
  BrandVariantType,
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

type ButtonPublicApi = {
  appearance: ButtonAppearanceType,
  size: SizeType,
  variant: AllVariantsType,
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
  public appearances = Object.values<ButtonAppearanceType>(ButtonAppearance);
  public sizes = Object.values<SizeType>(Size);
  public baseVariants = Object.values<BrandVariantType>(BrandVariant);
  public variants = Object.values<AllVariantsType>(AllVariants);

  public defaults: ButtonPublicApi & ButtonHelperControls = {
    appearance: ButtonAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
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
