import { Component } from '@angular/core';
import { IdsButtonComponent, IdsButtonGroupComponent } from '@i-cell/ids-angular/button';

@Component({
  selector: 'app-button-group-example',
  imports: [
    IdsButtonComponent,
    IdsButtonGroupComponent,
  ],
  templateUrl: './button-group-example.component.html',
})
export class ButtonGroupExampleComponent {}
