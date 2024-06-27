import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CheckboxVariant, CheckboxVariantType, IdsCheckboxComponent } from '@i-cell/widgets/checkbox';
import { Size, SizeType } from '@i-cell/widgets/core';
import { IdsValidators } from '@i-cell/widgets/forms';

@Component({
  selector: 'app-checkbox-demo',
  standalone: true,
  imports: [
    IdsCheckboxComponent,
    UpperCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-demo.component.html',
  styleUrl: './checkbox-demo.component.scss',
})
export class CheckboxDemoComponent {
  public label = 'Az Általános Szerződési Feltételeket a mai nappal tudomásul vettem és elfogadom';

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
