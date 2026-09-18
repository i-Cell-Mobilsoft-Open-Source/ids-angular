import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-form-control-example',
  imports: [
    ReactiveFormsModule,
    IdsButtonComponent,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
    IdsErrorMessageComponent,
  ],
  templateUrl: './segmented-control-form-control-example.component.html',
})
export class SegmentedControlFormControlExampleComponent {
  public view = new FormControl<string | null>(null, { validators: [Validators.required] });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.view.markAsTouched();
  }
}
