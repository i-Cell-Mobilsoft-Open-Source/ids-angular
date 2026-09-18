import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-disabled-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './switch-disabled-example.component.html',
})
export class SwitchDisabledExampleComponent {
  public disabledOff = false;
  public disabledOn = true;
  public readonlyOff = false;
  public readonlyOn = true;
}
