import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-button-config-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './accordion-button-config-example.component.html',
})
export class AccordionButtonConfigExampleComponent {}
