import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-sizes-example',
  imports: [
    FormsModule,
    IdsSwitchComponent,
    TranslateModule,
  ],
  templateUrl: './switch-sizes-example.component.html',
})
export class SwitchSizesExampleComponent {
  public dense = true;
  public compact = true;
  public comfortable = true;
  public spacious = true;
}
