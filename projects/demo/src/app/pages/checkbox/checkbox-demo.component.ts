import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxVariant, CheckboxVariantType, IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { IdsMessageSuffixDirective } from '@i-cell/ids-angular/forms/directives/message-suffix.directive';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    IdsCheckboxComponent,
    UpperCasePipe,
    ReactiveFormsModule,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsMessageSuffixDirective,
    TranslateModule,
  ],
  templateUrl: './checkbox-demo.component.html',
  styleUrl: './checkbox-demo.component.scss',
})
export class CheckboxDemoComponent {
  public label = 'I accept the terms and conditions';

  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: CheckboxVariantType[] = [
    CheckboxVariant.SURFACE,
    CheckboxVariant.LIGHT,
    CheckboxVariant.DARK,
  ];

  public form = new FormGroup({
    [CheckboxVariant.SURFACE]: new FormGroup({
      [Size.DENSE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMPACT]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMFORTABLE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.SPACIOUS]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
    }),
    [CheckboxVariant.LIGHT]: new FormGroup({
      [Size.DENSE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMPACT]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMFORTABLE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.SPACIOUS]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
    }),
    [CheckboxVariant.DARK]: new FormGroup({
      [Size.DENSE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMPACT]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.COMFORTABLE]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
      [Size.SPACIOUS]: new FormGroup({
        unselected: new FormControl(false, IdsValidators.requiredTrue),
        indeterminate: new FormControl(false, IdsValidators.requiredTrue),
        selected: new FormControl(true, IdsValidators.requiredFalse),
      }),
    }),
  });
}
