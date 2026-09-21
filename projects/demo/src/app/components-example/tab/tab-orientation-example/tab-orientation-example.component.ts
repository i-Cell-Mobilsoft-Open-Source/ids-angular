import { Component } from '@angular/core';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-orientation-example',
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-orientation-example.component.html',
})
export class TabOrientationExampleComponent {}
