import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-form-control-example',
  imports: [
    ReactiveFormsModule,
    IdsButtonComponent,
    IdsErrorMessageComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-form-control-example.component.html',
})
export class SegmentedControlToggleFormControlExampleComponent {
  public view = new FormControl<string | null>(null, { validators: [Validators.required] });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.view.markAsTouched();
  }
}
