import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';

@Component({
  selector: 'app-checkbox-ng-model-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsCheckboxComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
  ],
  templateUrl: './checkbox-ng-model-example.component.html',
})
export class CheckboxNgModelExampleComponent {
  public marketing = false;
  public accepted = false;

  public onSubmit(accepted: NgModel): void {
    accepted.control.markAsTouched();
  }
}
