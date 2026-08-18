import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-icon-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './accordion-icon-example.component.html',
})
export class AccordionIconExampleComponent {}
