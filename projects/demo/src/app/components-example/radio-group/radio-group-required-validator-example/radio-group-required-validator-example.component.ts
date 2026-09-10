import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-required-validator-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsButtonComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './radio-group-required-validator-example.component.html',
})
export class RadioGroupRequiredValidatorExampleComponent {
  public form = new FormGroup({
    selection: new FormControl<string | null>(null, Validators.required),
  });

  public onSubmit(): void {
    this.form.markAllAsTouched();
  }
}
