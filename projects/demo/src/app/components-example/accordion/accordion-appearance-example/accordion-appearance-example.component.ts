import { Component } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-appearance-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  templateUrl: './accordion-appearance-example.component.html',
})
export class AccordionAppearanceExampleComponent {}
