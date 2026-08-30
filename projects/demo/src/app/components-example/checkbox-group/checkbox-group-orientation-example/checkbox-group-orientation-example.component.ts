import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-orientation-example',
  imports: [
    FormsModule,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-orientation-example.component.html',
})
export class CheckboxGroupOrientationExampleComponent {
  public vertical = { a: false, b: false };
  public horizontal = { a: false, b: false };
}
