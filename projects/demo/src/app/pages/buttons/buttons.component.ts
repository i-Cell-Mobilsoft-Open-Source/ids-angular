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
import { mdiCheck, mdiMagnify } from '@mdi/js';
import { IdsIconComponent } from '../../components/icon/ids-icon.component';

@Component({
  standalone: true,
  selector: 'app-buttons',
  imports: [IdsButtonComponent, IdsIconComponent],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
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
