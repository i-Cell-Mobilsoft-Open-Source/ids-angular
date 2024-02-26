import { Component } from '@angular/core';
import {
  ButtonAppearance,
  ButtonAppearanceType,
  IdsButtonComponent,
} from '@i-cell/widgets/button';
import { IdsIconComponent } from '../../components/icon/ids-icon.component';
import { mdiMagnify, mdiCheck } from '@mdi/js';
import { Size, SizeType, Variant, VariantType } from '@i-cell/widgets/core';

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
  public variants = Object.values(Variant) as VariantType[];
  public filteredVariants = Object.values(Variant).filter(
    (variant) => !['error', 'success', 'warning'].includes(variant)
  ) as VariantType[];

  public mdiSearch = mdiMagnify;
  public mdiDone = mdiCheck;

  onClick(buttonName: string) {
    console.log(`${buttonName} button clicked`);
  }
}
