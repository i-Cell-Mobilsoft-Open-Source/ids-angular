import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-positions-example',
  imports: [
    IdsButtonComponent,
    IdsTooltipDirective,
    TranslateModule,
  ],
  templateUrl: './tooltip-positions-example.component.html',
})
export class TooltipPositionsExampleComponent {}
