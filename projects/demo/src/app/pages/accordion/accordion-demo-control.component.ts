import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, viewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_ACCORDION_DEFAULT_CONFIG_FACTORY, IdsAccordionAppearance, IdsAccordionAppearanceType, IdsAccordionComponent } from '@i-cell/ids-angular/accordion';
import { IdsButtonAppearance, IdsButtonAppearanceType, IdsButtonVariant, IdsButtonVariantType } from '@i-cell/ids-angular/button';
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
  selector: 'app-accordion-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './accordion-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './accordion-demo.component.scss',
  ],
})
export class AccordionDemoControlComponent {
  private _accordion = viewChild<IdsAccordionComponent>('accordion');
  protected _inputControlConfig: DemoControlConfig<AccordionInputControls> = {
    size: {
      description: 'Accordion size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    appearance: {
      description: 'Accordion appearance.',
      type: 'IdsAccordionAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
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
      control: DemoControl.SWITCH,
    },
    multi: {
      description: 'Allow multiple accordion items to be open.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    btnSize: {
      description: 'Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.btnSize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    btnAppearance: {
      description: 'Button appearance.',
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.btnAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    btnVariant: {
      description: 'Button variant.',
      type: 'IdsButtonVariantType',
      default: defaultConfig.btnVariant,
      control: DemoControl.SELECT,
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
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: defaultConfig.hasTrailingIcon,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<AccordionInputControls>(this._inputControlConfig);

  public model: AccordionInputControls = { ...this.defaults };

  @Output() public modelChange = new EventEmitter<AccordionInputControls>();

  public setModel(newModel: AccordionInputControls): void {
    this.model = newModel;
    this.modelChange.emit(this.model);
  }

  public reset(): void {
    this._accordion()?.closeAll();
    this.model = { ...this.defaults };
  }

}
