import { AccordionDemoService } from './accordion-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-accordion-demo',
  imports: [
    TryoutComponent,
    IdsAccordionComponent,
    IdsAccordionItemComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    PropTableComponent,
  ],
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class AccordionDemoComponent implements OnInit, OnDestroy {
  protected _accordionDemoService = inject(AccordionDemoService);

  private _accordion = viewChild<IdsAccordionComponent>('accordion');
  private _resetSubscription: Subscription | undefined;

  public ngOnInit(): void {
    this._resetSubscription = this._accordionDemoService.reset$.subscribe(() => {
      this._accordion()?.closeAll();
    });
  }

  public ngOnDestroy(): void {
    this._resetSubscription?.unsubscribe();
  }
}
