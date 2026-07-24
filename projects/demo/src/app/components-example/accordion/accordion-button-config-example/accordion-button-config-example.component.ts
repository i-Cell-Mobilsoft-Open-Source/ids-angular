import { Component } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-button-config-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  templateUrl: './accordion-button-config-example.component.html',
})
export class AccordionButtonConfigExampleComponent {}
