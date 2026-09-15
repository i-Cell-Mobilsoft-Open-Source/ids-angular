import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-ng-model-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsErrorMessageComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-ng-model-example.component.html',
})
export class SegmentedControlToggleNgModelExampleComponent {
  public view: string | null = null;

  public onSubmit(viewModel: NgModel): void {
    viewModel.control.markAsTouched();
  }
}
