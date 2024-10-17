import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsSize,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent, IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonVariantType, IdsIconButtonVariant } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

type IconButtonPublicApi = {
  size: IdsSizeType,
  variant: IdsIconButtonVariantType,
  appearance: IdsIconButtonAppearanceType,
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
    size: IdsSize.COMFORTABLE,
    variant: IdsIconButtonVariant.PRIMARY,
    appearance: IdsIconButtonAppearance.FILLED,
    disabled: false,
  };

  public model: IconButtonPublicApi = { ...this.defaults  };
  
  public appearances = Object.values<IdsIconButtonAppearanceType>(IdsIconButtonAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsIconButtonVariantType>(IdsIconButtonVariant);

  public onClick(buttonName: string): void {
    console.info(`${buttonName} icon button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
