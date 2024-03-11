import { Component, ViewEncapsulation } from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/widgets/core';
import { IdsDividerComponent } from '@i-cell/widgets/divider';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [IdsDividerComponent],
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class DividerDemoComponent {
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];
}
