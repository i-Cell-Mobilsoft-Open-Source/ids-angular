import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsSwitchComponent, SwitchVariant, SwitchVariantType } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [
    IdsSwitchComponent,
    TranslateModule,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './switch-demo.component.html',
  styleUrl: './switch-demo.component.scss',
})
export class SwitchDemoComponent {
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: SwitchVariantType[] = [
    SwitchVariant.SURFACE,
    SwitchVariant.LIGHT,
    SwitchVariant.PRIMARY,
  ];
}
