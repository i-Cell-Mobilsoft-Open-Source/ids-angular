import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionAppearance, AccordionAppearanceType, IdsAccordionComponent } from '@i-cell/ids-angular/accordion';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type AccordionPublicApi = {
  size: SizeType,
  appearance: AccordionAppearanceType,
  summary: string,
  disabled: boolean,
};

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    IdsAccordionComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './accordion-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './accordion-demo.component.scss',
  ],
})
export class AccordionDemoComponent {
  public appearances = Object.values(AccordionAppearance) as AccordionAppearanceType[];
  public sizes = Object.values(Size) as SizeType[];

  public defaults: AccordionPublicApi = {
    appearance: AccordionAppearance.TEXT,
    size: Size.COMFORTABLE,
    summary: 'Summary text',
    disabled: false,
  };
  
  public model: AccordionPublicApi = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
