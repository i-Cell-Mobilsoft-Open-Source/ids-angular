import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    IdsTooltipDirective,
    IdsButtonComponent,
    TranslateModule,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
})
export class TooltipDemoComponent {
  public showDelay = 0;
  // eslint-disable-next-line no-magic-numbers
  public hideDelay = 5_000;
  public tooltipText = 'Tooltip text should be here';
}
