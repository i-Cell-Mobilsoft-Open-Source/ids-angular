import { Component, ViewEncapsulation } from '@angular/core';
import { IdsAccordionComponent } from '@i-cell/ids-angular/accordion';
import { AccordionAppearance, AccordionAppearanceType } from '@i-cell/ids-angular/accordion/types/ids-accordion-appearance';
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
