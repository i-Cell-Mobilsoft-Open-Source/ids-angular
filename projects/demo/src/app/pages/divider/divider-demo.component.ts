import { Component } from '@angular/core';
import {
  AllVariants,
  AllVariantsType,
  Size,
  SizeType,
} from '@i-cell/ids-angular/core';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-divider-demo',
  standalone: true,
  imports: [
    IdsDividerComponent,
    TranslateModule,
  ],
  templateUrl: './divider-demo.component.html',
  styleUrl: './divider-demo.component.scss',
})
export class DividerDemoComponent {
  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(AllVariants) as AllVariantsType[];
}
