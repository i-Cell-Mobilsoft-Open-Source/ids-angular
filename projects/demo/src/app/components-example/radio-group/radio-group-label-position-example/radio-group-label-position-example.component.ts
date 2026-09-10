import { Component } from '@angular/core';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-label-position-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-label-position-example.component.html',
})
export class RadioGroupLabelPositionExampleComponent {}
