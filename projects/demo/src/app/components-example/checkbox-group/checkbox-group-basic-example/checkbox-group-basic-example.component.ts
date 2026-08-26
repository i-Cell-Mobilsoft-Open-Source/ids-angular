import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-basic-example',
  imports: [
    FormsModule,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-basic-example.component.html',
})
export class CheckboxGroupBasicExampleComponent {
  public group = { apple: false, banana: true, cherry: false };
}
