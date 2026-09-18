import { Component } from '@angular/core';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-stretch-tabs-example',
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-stretch-tabs-example.component.html',
})
export class TabStretchTabsExampleComponent {}
