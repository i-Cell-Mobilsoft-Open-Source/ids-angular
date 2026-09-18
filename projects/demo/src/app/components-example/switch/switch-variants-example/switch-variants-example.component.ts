import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-variants-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './switch-variants-example.component.html',
})
export class SwitchVariantsExampleComponent {
  public primary = true;
  public surface = true;
  public light = true;
}
