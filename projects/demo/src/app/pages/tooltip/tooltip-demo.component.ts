import { TooltipDemoService } from './tooltip-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip-demo',
  imports: [
    TryoutComponent,
    IdsTooltipDirective,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './tooltip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tooltip-demo.component.scss',
  ],
})
export class TooltipDemoComponent {
  protected _tooltipDemoService = inject(TooltipDemoService);
}
