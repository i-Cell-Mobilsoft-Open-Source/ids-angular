import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';

@Component({
  selector: 'app-accordion-appearance-example',
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './accordion-appearance-example.component.html',
})
export class AccordionAppearanceExampleComponent {}
