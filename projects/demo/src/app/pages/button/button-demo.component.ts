import { Component } from '@angular/core';
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
import { mdiCheck, mdiMagnify } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-button-demo',
  imports: [
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss'],
})
export class ButtonDemoComponent {
  public appearances = Object.values(ButtonAppearance) as ButtonAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public baseVariants = Object.values(BrandVariant) as BrandVariantType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public mdiSearch = mdiMagnify;
  public mdiDone = mdiCheck;

  public onClick(buttonName: string): void {
    // eslint-disable-next-line no-console
    console.log(`${buttonName} button clicked`);
  }
}
