import { Component } from '@angular/core';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-label-hint-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-label-hint-example.component.html',
})
export class RadioGroupLabelHintExampleComponent {}
