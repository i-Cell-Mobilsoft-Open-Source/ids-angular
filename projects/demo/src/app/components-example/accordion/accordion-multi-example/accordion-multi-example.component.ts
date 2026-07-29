import { Component } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-multi-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  templateUrl: './accordion-multi-example.component.html',
})
export class AccordionMultiExampleComponent {}
