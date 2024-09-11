import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

type SampleOption = {
  value: string
  viewValue: string
};

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsOptionComponent,
  ],
  templateUrl: './select-demo.component.html',
  styleUrl: './select-demo.component.scss',
})
export class SelectDemoComponent {
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

  public options: SampleOption[] = [
    { viewValue: 'Kutya', value: 'kutya' },
    { viewValue: 'Macska', value: 'macska' },
    { viewValue: 'Zsiráf', value: 'zsiraf' },
    { viewValue: 'Krokodil', value: 'korkodil' },
    { viewValue: 'Orángután', value: 'orangutan' },
    { viewValue: 'Mammut', value: 'mammut' },
  ];
}
