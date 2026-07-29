import { Component } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-icon-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  templateUrl: './accordion-icon-example.component.html',
})
export class AccordionIconExampleComponent {}
