import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-disabled-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './select-disabled-example.component.html',
})
export class SelectDisabledExampleComponent {
  public disabledEmptyValue: string | null = null;
  public disabledValue: string | null = 'APPLE';
  public readonlyEmptyValue: string | null = null;
  public readonlyValue: string | null = 'BANANA';
}
