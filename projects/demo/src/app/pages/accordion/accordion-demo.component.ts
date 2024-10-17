import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAccordionAppearance, IdsAccordionAppearanceType, IdsAccordionComponent, IdsAccordionItemComponent, IdsAccordionVariant, IdsAccordionVariantType } from '@i-cell/ids-angular/accordion';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

type AccordionPublicApi = {
  size: IdsSizeType,
  appearance: IdsAccordionAppearanceType,
  summary: string,
  disabled: boolean,
  multi: boolean,
  btnSize: IdsSizeType,
  btnAppearance: IdsButtonAppearanceType,
  btnVariant: IdsAccordionVariantType,
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
  public appearances = Object.values<IdsAccordionAppearanceType>(IdsAccordionAppearance);
  public btnAppearances = Object.values<IdsButtonAppearanceType>(IdsButtonAppearance);
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsAccordionVariantType>(IdsAccordionVariant);

  public defaults: AccordionPublicApi = {
    appearance: IdsAccordionAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    summary: 'Summary text',
    disabled: false,
    multi: false,
    btnSize: IdsSize.COMPACT,
    btnAppearance: IdsButtonAppearance.FILLED,
    btnVariant: IdsAccordionVariant.SURFACE,
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
