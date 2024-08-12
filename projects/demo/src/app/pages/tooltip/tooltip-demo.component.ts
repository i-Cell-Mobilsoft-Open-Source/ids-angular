import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip/ids-tooltip.directive';

@Component({
  selector: 'app-tooltip-demo',
  standalone: true,
  imports: [
    IdsTooltipDirective,
    IdsButtonComponent,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrl: './tooltip-demo.component.scss',
})
export class TooltipDemoComponent {
  public showDelay = 0;
  // eslint-disable-next-line no-magic-numbers
  public hideDelay = 2_000;
}
