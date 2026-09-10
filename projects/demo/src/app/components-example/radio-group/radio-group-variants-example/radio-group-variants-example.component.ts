import { Component } from '@angular/core';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-variants-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-variants-example.component.html',
})
export class RadioGroupVariantsExampleComponent {}
