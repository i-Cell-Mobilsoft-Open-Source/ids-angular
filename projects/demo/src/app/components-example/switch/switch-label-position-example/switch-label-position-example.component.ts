import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-label-position-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './switch-label-position-example.component.html',
})
export class SwitchLabelPositionExampleComponent {
  public left = true;
  public right = true;
}
