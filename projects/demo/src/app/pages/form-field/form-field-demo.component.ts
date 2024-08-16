import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IdsActionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuccessMessageComponent, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { mdiMagnify, mdiMoonWaningCrescent, mdiWhiteBalanceSunny } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-demo',
  standalone: true,
  imports: [
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
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule,
  ],
  templateUrl: './form-field-demo.component.html',
  styleUrl: './form-field-demo.component.scss',
})
export class FormFieldDemoComponent {
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
