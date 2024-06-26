import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/widgets/button';
import {
  ButtonAppearance,
  ButtonAppearanceType,
  BrandVariant,
  BrandVariantType,
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiCheck, mdiMagnify } from '@mdi/js';

@Component({
  standalone: true,
  selector: 'app-button-demo',
  imports: [IdsButtonComponent, IdsIconComponent],
  templateUrl: './button-demo.component.html',
  styleUrls: ['./button-demo.component.scss'],
})
export class ButtonDemoComponent {
  public appearances = Object.values(
    ButtonAppearance
  ) as ButtonAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public baseVariants = Object.values(BrandVariant) as BrandVariantType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];

  public mdiSearch = mdiMagnify;
  public mdiDone = mdiCheck;

  onClick(buttonName: string) {
    console.log(`${buttonName} button clicked`);
  }
}
