import { Component } from '@angular/core';
import {
  BaseButtonVariant,
  BaseButtonVariantType,
  ButtonVariant,
  ButtonVariantType,
  IconButtonAppearance,
  IconButtonAppearanceType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
import { IdsIconButtonComponent } from '@i-cell/widgets/icon-button';
import { mdiMagnify } from '@mdi/js';
import { IdsIconComponent } from '../../../../../widgets/icon/ids-icon.component';

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
  public baseVariants = Object.values(BaseButtonVariant) as BaseButtonVariantType[];
  public variants = Object.values(ButtonVariant) as ButtonVariantType[];

  public mdiSearch = mdiMagnify;

  onClick(buttonName: string) {
    console.log(`${buttonName} icon button clicked`);
  }
}
