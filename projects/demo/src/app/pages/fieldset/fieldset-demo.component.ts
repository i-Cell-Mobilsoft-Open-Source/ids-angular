import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FieldsetVariant, FieldsetVariantType, IdsFieldsetComponent, IdsFieldsetMessageDirective, IdsFieldsetRowComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-fieldset-demo',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    UpperCasePipe,
    TranslateModule,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrls: ['./fieldset-demo.component.scss'],
})
export class FieldsetDemoComponent {
  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: FieldsetVariantType[] = [
    FieldsetVariant.LIGHT,
    FieldsetVariant.SURFACE,
  ];
}
