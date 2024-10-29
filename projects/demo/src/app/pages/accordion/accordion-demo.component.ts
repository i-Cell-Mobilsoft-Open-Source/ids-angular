import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_ACCORDION_DEFAULT_CONFIG_FACTORY, IdsAccordionAppearance, IdsAccordionAppearanceType, IdsAccordionComponent, IdsAccordionItemComponent } from '@i-cell/ids-angular/accordion';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonComponent, IdsButtonVariant, IdsButtonVariantType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_ACCORDION_DEFAULT_CONFIG_FACTORY();

type AccordionInputControls = {
  size: IdsSizeType,
  appearance: IdsAccordionAppearanceType,
  summary: string,
  disabled: boolean,
  multi: boolean,
  btnSize: IdsSizeType,
  btnAppearance: IdsButtonAppearanceType,
  btnVariant: IdsButtonVariantType,
  expandBtnLabel: string,
  collapseBtnLabel: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

@Component({
  selector: 'app-accordion-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
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
  protected _inputControlConfig: DemoControlConfig<AccordionInputControls> = {
    size: {
      description: 'Accordion size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    appearance: {
      description: 'Accordion appearance.',
      type: 'IdsAccordionAppearanceType',
      default: defaultConfig.appearance,
      control: 'select',
      list: convertEnumToStringArray(IdsAccordionAppearance),
    },
    summary: {
      description: 'Summary of accordion',
      type: 'string',
      default: '-',
      demoDefault: 'Summary text',
    },
    disabled: {
      description: 'Whether the accordion is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    multi: {
      description: 'Allow multiple accordion items to be open.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    btnSize: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.btnSize,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    btnAppearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.btnAppearance,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    btnVariant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: defaultConfig.btnVariant,
      control: 'select',
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    expandBtnLabel: {
      description: 'Label for expand all button.',
      type: 'string',
      default: defaultConfig.expandBtnLabel,
    },
    collapseBtnLabel: {
      description: 'Label for collapse all button.',
      type: 'string',
      default: defaultConfig.collapseBtnLabel,
    },
    hasLeadingIcon: {
      description: 'Whether the button has leading icon or not.',
      type: 'boolean',
      default: defaultConfig.hasLeadingIcon,
      control: 'checkbox',
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: defaultConfig.hasTrailingIcon,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<AccordionInputControls>(this._inputControlConfig);
  
  public model: AccordionInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }
}
