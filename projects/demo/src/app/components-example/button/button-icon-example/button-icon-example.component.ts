import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'app-button-icon-example',
  imports: [
    IdsButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './button-icon-example.component.html',
})
export class ButtonIconExampleComponent {}
