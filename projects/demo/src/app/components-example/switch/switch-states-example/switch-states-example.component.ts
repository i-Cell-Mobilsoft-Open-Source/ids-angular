import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-states-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './switch-states-example.component.html',
})
export class SwitchStatesExampleComponent {
  public off = false;
  public on = true;
}
