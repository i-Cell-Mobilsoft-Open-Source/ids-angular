import { AccordionDemoService } from './accordion-demo.service';

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
  ],
  templateUrl: './accordion-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './accordion-demo.component.scss',
  ],
})
export class AccordionDemoComponent implements OnInit, OnDestroy {
  public accordionDemoService = inject(AccordionDemoService);

  private _accordion = viewChild<IdsAccordionComponent>('accordion');
  private _resetSubscription: Subscription | undefined;

  public ngOnInit(): void {
    this._resetSubscription = this.accordionDemoService.reset$.subscribe(() => {
      this._accordion()?.closeAll();
    });
  }

  public ngOnDestroy(): void {
    // 5. Ne felejts el leiratkozni
    this._resetSubscription?.unsubscribe();
  }
}
