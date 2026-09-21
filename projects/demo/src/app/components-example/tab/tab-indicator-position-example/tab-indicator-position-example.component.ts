import { Component } from '@angular/core';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-indicator-position-example',
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-indicator-position-example.component.html',
})
export class TabIndicatorPositionExampleComponent {}
