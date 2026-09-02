import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-heading-level-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './accordion-heading-level-example.component.html',
})
export class AccordionHeadingLevelExampleComponent {}
