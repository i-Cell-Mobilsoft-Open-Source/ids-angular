import { Component, ViewEncapsulation } from '@angular/core';
import { IdsAvatarComponent } from '@i-cell/widgets/avatar';
import {
  BaseVariant,
  BaseVariantType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [IdsAvatarComponent],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AvatarComponent {
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(BaseVariant) as BaseVariantType[];
}
