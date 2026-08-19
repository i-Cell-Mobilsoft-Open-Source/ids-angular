import { Component } from '@angular/core';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';

@Component({
  selector: 'app-checkbox-hint-example',
  imports: [
    IdsCheckboxComponent,
    IdsHintMessageComponent,
  ],
  templateUrl: './checkbox-hint-example.component.html',
})
export class CheckboxHintExampleComponent {}
