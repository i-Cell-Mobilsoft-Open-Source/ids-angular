import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IdsActionDirective, IdsErrorMessageComponent, IdsFieldsetComponent, IdsFieldsetMessageDirective, IdsFieldsetRowComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuccessMessageComponent, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiMagnify, mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-fieldset-demo',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    UpperCasePipe,
    TranslateModule,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrls: ['./fieldset-demo.component.scss'],
})
export class FieldsetDemoComponent {
  public iconSun = mdiWhiteBalanceSunny;
  public iconMoon = mdiMoonWaningCrescent;
  public searchIcon = mdiMagnify;

  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: FormFieldVariantType[] = [
    FormFieldVariant.SURFACE,
    FormFieldVariant.LIGHT,
  ];
}
