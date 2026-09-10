import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent, IdsSwitchGroupComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-group-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    IdsSwitchGroupComponent,
    TranslateModule,
  ],
  templateUrl: './switch-group-example.component.html',
})
export class SwitchGroupExampleComponent {
  public email = true;
  public sms = false;
  public push = true;
}
