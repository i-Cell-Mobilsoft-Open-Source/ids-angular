import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-ng-model-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
    IdsErrorMessageComponent,
  ],
  templateUrl: './segmented-control-ng-model-example.component.html',
})
export class SegmentedControlNgModelExampleComponent {
  public view: string | null = null;

  public onSubmit(viewModel: NgModel): void {
    viewModel.control.markAsTouched();
  }
}
