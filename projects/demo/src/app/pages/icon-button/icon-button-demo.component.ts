import { Component } from '@angular/core';
import {
  BrandVariant,
  BrandVariantType,
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IconButtonAppearance, IconButtonAppearanceType } from '@i-cell/ids-angular/icon-button/types/ids-icon-button-appearance';
import { mdiMagnify } from '@mdi/js';

@Component({
  standalone: true,
  selector: 'app-icon-button-demo',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: ['./icon-button-demo.component.scss'],
})
export class IconButtonDemoComponent {
  public appearances = Object.values(IconButtonAppearance) as IconButtonAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public baseVariants = Object.values(BrandVariant) as BrandVariantType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public mdiSearch = mdiMagnify;

  public onClick(buttonName: string): void {
    // eslint-disable-next-line no-console
    console.log(`${buttonName} icon button clicked`);
  }
}
