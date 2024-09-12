/* eslint-disable no-magic-numbers */
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

type SampleOption = {
  value: string
  viewValue: string
};

type AnimalOptions = {
  land: SampleOption[]
  aquatic: SampleOption[]
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
    IdsOptionGroupComponent,
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

  public options: AnimalOptions = {
    land: [
      { viewValue: 'Kutya', value: 'dog' },
      { viewValue: 'Macska', value: 'cat' },
      { viewValue: 'Zsiráf', value: 'giraffe' },
      { viewValue: 'Orángután', value: 'orangutan' },
      { viewValue: 'Mamut', value: 'mammoth' },
      { viewValue: 'Közönséges világoskékpettyes lábatlangyík', value: 'lizard' },
    ],
    aquatic: [
      { viewValue: 'Krokodil', value: 'crocodile' },
      { viewValue: 'Bálna', value: 'whale' },
      { viewValue: 'Delfin', value: 'doplhin' },
      { viewValue: 'Cápa', value: 'shark' },
    ],
  };

  public singleSelectionValue: string = this.options['land'][0].value;
  public multiSelectionValue: string[] = [
    this.options['land'][0].value,
    this.options['land'][2].value,
    this.options['aquatic'][1].value,
  ];
}
