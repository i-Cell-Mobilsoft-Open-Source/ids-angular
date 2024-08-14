import { Component } from '@angular/core';
import { AccordionAppearance, AccordionAppearanceType, IdsAccordionComponent } from '@i-cell/ids-angular/accordion';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    IdsAccordionComponent,
    TranslateModule,
  ],
  templateUrl: './accordion-demo.component.html',
  styleUrl: './accordion-demo.component.scss',
})
export class AccordionDemoComponent {
  public appearances = Object.values(AccordionAppearance) as AccordionAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];
}
