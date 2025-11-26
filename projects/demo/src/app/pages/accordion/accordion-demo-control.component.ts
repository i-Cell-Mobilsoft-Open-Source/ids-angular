import { AccordionDemoService } from './accordion-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accordion-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './accordion-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './accordion-demo.component.scss',
  ],
})
export class AccordionDemoControlComponent {
  public accordionDemoService = inject(AccordionDemoService);

  public reset(): void {
    this.accordionDemoService.reset();
  }
}
