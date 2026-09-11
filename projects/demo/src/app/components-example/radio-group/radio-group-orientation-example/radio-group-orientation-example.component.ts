import { Component } from '@angular/core';
import { IdsRadioComponent, IdsRadioGroupComponent } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-group-orientation-example',
  imports: [
    IdsRadioGroupComponent,
    IdsRadioComponent,
    TranslateModule,
  ],
  templateUrl: './radio-group-orientation-example.component.html',
  styles: [
    `
    .horizontal-wrap ::ng-deep .ids-radio-group-horizontal .ids-radio-group__list {
      flex-wrap: wrap;
    }
  `,
  ],
})
export class RadioGroupOrientationExampleComponent {}
