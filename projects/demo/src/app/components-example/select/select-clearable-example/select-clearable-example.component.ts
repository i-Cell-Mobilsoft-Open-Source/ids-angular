import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsLabelDirective, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-clearable-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './select-clearable-example.component.html',
})
export class SelectClearableExampleComponent {
  public value: string | null = 'APPLE';
  public values: string[] = [
    'APPLE',
    'CHERRY',
  ];
}
