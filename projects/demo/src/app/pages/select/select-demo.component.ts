/* eslint-disable no-magic-numbers */
import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { FormFieldVariant, FormFieldVariantType, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent, IdsSelectTriggerDirective } from '@i-cell/ids-angular/select';
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
    IdsSelectTriggerDirective,
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
      { viewValue: 'Dog', value: 'dog' },
      { viewValue: 'Cat', value: 'cat' },
      { viewValue: 'Giraffe', value: 'giraffe' },
      { viewValue: 'Orangutan', value: 'orangutan' },
      { viewValue: 'Mammoth', value: 'mammoth' },
      { viewValue: 'Opisthocoelicaudia Skarzynski', value: 'opisthocoelicaudia skarzynski' },
    ],
    aquatic: [
      { viewValue: 'Crocodile', value: 'crocodile' },
      { viewValue: 'Whale', value: 'whale' },
      { viewValue: 'Dolphin', value: 'doplhin' },
      { viewValue: 'Shark', value: 'shark' },
    ],
  };

  public singleSelectionValue: string = this.options.land[0].value;
  public multiSelectionValue: string[] = [
    this.options['land'][0].value,
    this.options['land'][2].value,
    this.options['aquatic'][1].value,
  ];

  public customTriggerValues: string[] = [
    'Apple',
    'Banana',
    'Mango',
    'Orange',
    'Strawberry',
    'Pineapple',
    'Watermelon',
    'Grapes',
    'Blueberry',
    'Peach',
  ];

  public cutomTriggerMultiSelectionValue: string[] = [
    this.customTriggerValues[0],
    this.customTriggerValues[2],
    this.customTriggerValues[5],
  ];
}
