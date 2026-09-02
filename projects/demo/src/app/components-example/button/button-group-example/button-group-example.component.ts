import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsButtonComponent, IdsButtonGroupComponent } from '@i-cell/ids-angular/button';

@Component({
  selector: 'app-button-group-example',
  imports: [
    IdsButtonComponent,
    IdsButtonGroupComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './button-group-example.component.html',
})
export class ButtonGroupExampleComponent {}
