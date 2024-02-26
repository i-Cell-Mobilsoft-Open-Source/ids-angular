import { Component } from '@angular/core';
import {
  Appearance,
  AppearanceType,
  IdsButtonComponent,
  Size,
  SizeType,
  Variant,
  VariantType,
} from '@i-cell/widgets/button';
import { IdsIconComponent } from '../../components/icon/ids-icon.component';
import { mdiMagnify, mdiCheck } from '@mdi/js';

@Component({
  standalone: true,
  selector: 'app-buttons',
  imports: [IdsButtonComponent, IdsIconComponent],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {
  public appearances = Object.values(Appearance) as AppearanceType[];
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
