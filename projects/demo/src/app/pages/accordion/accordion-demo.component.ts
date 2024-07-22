import { Component, ViewEncapsulation } from '@angular/core';
import { AccordionAppearance, AccordionAppearanceType, IdsAccordionComponent } from '@i-cell/ids-angular/accordion';
import { Size, SizeType } from '@i-cell/ids-angular/core';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [IdsAccordionComponent],
  templateUrl: './accordion-demo.component.html',
  styleUrl: './accordion-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AccordionDemoComponent {
  public appearances = Object.values(AccordionAppearance) as AccordionAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
}
