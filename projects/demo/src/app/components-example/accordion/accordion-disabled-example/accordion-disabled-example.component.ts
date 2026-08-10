import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-disabled-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './accordion-disabled-example.component.html',
})
export class AccordionDisabledExampleComponent {}
