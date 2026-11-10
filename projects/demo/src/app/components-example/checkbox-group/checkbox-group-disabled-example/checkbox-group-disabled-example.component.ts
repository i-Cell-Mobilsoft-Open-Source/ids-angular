import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-disabled-example',
  imports: [
    FormsModule,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-disabled-example.component.html',
})
export class CheckboxGroupDisabledExampleComponent {
  public group = { email: true, sms: false, push: true };
}
