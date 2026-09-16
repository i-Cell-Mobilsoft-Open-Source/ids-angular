import { Component } from '@angular/core';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-variants-example',
  imports: [
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-variants-example.component.html',
})
export class TabVariantsExampleComponent {}
