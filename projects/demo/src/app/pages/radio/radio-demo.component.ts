import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsRadioGroupDirective, IdsRadioItemComponent, RadioVariant, RadioVariantType } from '@i-cell/ids-angular/radio';

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [
    IdsRadioGroupDirective,
    IdsRadioItemComponent,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
  ],
  templateUrl: './radio-demo.component.html',
  styleUrl: './radio-demo.component.scss',
})
export class RadioDemoComponent {
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: RadioVariantType[] = [
    RadioVariant.SURFACE,
    RadioVariant.LIGHT,
    RadioVariant.DARK,
  ];
}
