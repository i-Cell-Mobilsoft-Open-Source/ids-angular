import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-parent-example',
  imports: [
    FormsModule,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-parent-example.component.html',
})
export class CheckboxGroupParentExampleComponent {
  public group = { read: false, write: false, execute: false };
}
