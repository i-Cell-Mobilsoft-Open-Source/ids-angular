import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { IdsSideSheetComponent } from '@i-cell/ids-angular/side-sheet';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-sheet-form-example',
  imports: [
    IdsSideSheetComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './side-sheet-form-example.component.html',
})
export class SideSheetFormExampleComponent {
  protected _firstName = '';
  protected _lastName = '';
  protected _email = '';
}
