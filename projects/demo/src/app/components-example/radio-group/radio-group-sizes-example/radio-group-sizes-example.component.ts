import { Component } from '@angular/core';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-sizes-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-sizes-example.component.html',
})
export class RadioGroupSizesExampleComponent {}
