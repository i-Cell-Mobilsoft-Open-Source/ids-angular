import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-multiselect-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './select-multiselect-example.component.html',
})
export class SelectMultiselectExampleComponent {
  public value: string[] = [];
}
