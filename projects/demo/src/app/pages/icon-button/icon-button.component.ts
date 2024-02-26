import { Component } from '@angular/core';
import {
  IconButtonAppearance,
  IconButtonAppearanceType,
  IdsIconButtonComponent,
} from '@i-cell/widgets/icon-button';
import { IdsIconComponent } from '../../components/icon/ids-icon.component';
import { mdiMagnify } from '@mdi/js';
import { Size, SizeType, Variant, VariantType } from '@i-cell/widgets/core';

@Component({
  standalone: true,
  selector: 'app-icon-button',
  imports: [IdsIconButtonComponent, IdsIconComponent],
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss'],
})
export class IconButtonComponent {
  public appearances = Object.values(
    IconButtonAppearance
  ) as IconButtonAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(Variant) as VariantType[];
  public filteredVariants = Object.values(Variant).filter(
    (variant) => !['error', 'success', 'warning'].includes(variant)
  ) as VariantType[];

  public mdiSearch = mdiMagnify;

  onClick(buttonName: string) {
    console.log(`${buttonName} icon button clicked`);
  }
}
