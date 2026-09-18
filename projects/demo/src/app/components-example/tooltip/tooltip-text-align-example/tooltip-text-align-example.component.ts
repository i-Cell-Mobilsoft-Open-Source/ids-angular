import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-text-align-example',
  imports: [
    IdsButtonComponent,
    IdsTooltipDirective,
    TranslateModule,
  ],
  templateUrl: './tooltip-text-align-example.component.html',
})
export class TooltipTextAlignExampleComponent {}
