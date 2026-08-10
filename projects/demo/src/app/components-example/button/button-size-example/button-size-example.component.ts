import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';

@Component({
  selector: 'app-button-size-example',
  imports: [IdsButtonComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './button-size-example.component.html',
})
export class ButtonSizeExampleComponent {}
