import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';

@Component({
  selector: 'app-button-variants-example',
  imports: [IdsButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './button-variants-example.component.html',
})
export class ButtonVariantsExampleComponent {}
