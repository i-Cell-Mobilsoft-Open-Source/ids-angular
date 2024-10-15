import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionAppearance, AccordionAppearanceType, IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';
import { ButtonAppearance, ButtonAppearanceType, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { AllVariants, AllVariantsType, Size, SizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type AccordionPublicApi = {
  size: SizeType,
  appearance: AccordionAppearanceType,
  summary: string,
  disabled: boolean,
  multi: boolean,
  btnSize: SizeType,
  btnAppearance: ButtonAppearanceType,
  btnVariant: AllVariantsType,
  expandBtnLabel: string,
  collapseBtnLabel: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    IdsAccordionComponent,
    IdsAccordionItemComponent,
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
  public appearances = Object.values<AccordionAppearanceType>(AccordionAppearance);
  public btnAppearances = Object.values<ButtonAppearanceType>(ButtonAppearance);
  public sizes = Object.values<SizeType>(Size);
  public variants = Object.values<AllVariantsType>(AllVariants);

  public defaults: AccordionPublicApi = {
    appearance: AccordionAppearance.FILLED,
    size: Size.COMFORTABLE,
    summary: 'Summary text',
    disabled: false,
    multi: false,
    btnSize: Size.COMPACT,
    btnAppearance: ButtonAppearance.FILLED,
    btnVariant: AllVariants.SURFACE,
    expandBtnLabel: 'Expand all',
    collapseBtnLabel: 'Collapse all',
    hasLeadingIcon: false,
    hasTrailingIcon: true,
  };
  
  public model: AccordionPublicApi = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
