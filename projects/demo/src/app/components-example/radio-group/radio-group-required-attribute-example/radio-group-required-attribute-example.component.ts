import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-required-attribute-example',
  imports: [
    FormsModule,
    IdsRadioGroupComponent,
    IdsRadioComponent,
    IdsErrorMessageComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-required-attribute-example.component.html',
})
export class RadioGroupRequiredAttributeExampleComponent {
  public selection: string | undefined;
}
