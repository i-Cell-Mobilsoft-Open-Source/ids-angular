import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-variants-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './select-variants-example.component.html',
})
export class SelectVariantsExampleComponent {
  public surfaceValue: string | null = null;
  public lightValue: string | null = null;
}
