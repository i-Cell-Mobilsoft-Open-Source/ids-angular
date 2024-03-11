import { Component, ViewEncapsulation } from '@angular/core';
import { IdsAvatarComponent } from '@i-cell/widgets/avatar';
import {
  BaseVariant,
  BaseVariantType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';

@Component({
  selector: 'app-avatar-demo',
  standalone: true,
  imports: [IdsAvatarComponent],
  templateUrl: './avatar-demo.component.html',
  styleUrl: './avatar-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AvatarDemoComponent {
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(BaseVariant) as BaseVariantType[];
}
