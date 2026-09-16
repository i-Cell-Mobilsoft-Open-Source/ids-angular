import { Component } from '@angular/core';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-item-properties-example',
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-item-properties-example.component.html',
})
export class TabItemPropertiesExampleComponent {}
