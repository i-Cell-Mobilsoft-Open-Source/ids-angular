import { Component } from '@angular/core';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-alignment-example',
  imports: [
    IdsDividerComponent,
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
  ],
  templateUrl: './tab-alignment-example.component.html',
})
export class TabAlignmentExampleComponent {}
