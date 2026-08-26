import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-required-example',
  imports: [
    IdsButtonComponent,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-required-example.component.html',
})
export class CheckboxGroupRequiredExampleComponent {
  public form = new FormGroup({
    terms: new FormGroup(
      {
        privacy: new FormControl(false, [Validators.required]),
        marketing: new FormControl(false, [Validators.required]),
      },
      { validators: [Validators.required] },
    ),
  });

  public onSubmit(): void {
    this.form.controls.terms.markAsTouched();
  }
}
