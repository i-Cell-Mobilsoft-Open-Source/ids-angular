import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTabComponent, IdsTabGroupComponent } from '@i-cell/ids-angular/tab';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-prefix-suffix-example',
  imports: [
    IdsButtonComponent,
    IdsTabGroupComponent,
    IdsTabComponent,
    IdsTooltipDirective,
    TranslateModule,
  ],
  templateUrl: './tab-prefix-suffix-example.component.html',
})
export class TabPrefixSuffixExampleComponent {}
