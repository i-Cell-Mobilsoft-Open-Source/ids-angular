import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent, IconButtonAppearance, IconButtonAppearanceType } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

type IconButtonPublicApi = {
  size: SizeType,
  variant: AllVariantsType,
  appearance: IconButtonAppearanceType,
  disabled: boolean,
};

@Component({
  standalone: true,
  selector: 'app-icon-button-demo',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    TranslateModule,
    IdsButtonComponent,
    FormsModule,
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-button-demo.component.scss',
  ],
})
export class IconButtonDemoComponent {
  public defaults: IconButtonPublicApi = {
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
    appearance: IconButtonAppearance.FILLED,
    disabled: false,
  };

  public model: IconButtonPublicApi = { ...this.defaults  };
  
  public appearances = Object.values(IconButtonAppearance) as IconButtonAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public onClick(buttonName: string): void {
    console.info(`${buttonName} icon button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
