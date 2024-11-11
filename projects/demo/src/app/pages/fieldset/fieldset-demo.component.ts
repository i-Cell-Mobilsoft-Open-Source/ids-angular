import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FIELDSET_DEFAULT_CONFIG_FACTORY, IdsErrorMessageComponent, IdsFieldsetComponent, IdsFieldsetMessageDirective, IdsFieldsetRowComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

type FieldsetInputControls = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
  legend: string,
};

type FieldsetHelperControls = {
  showMessage: boolean,
};

const defaultConfig = IDS_FIELDSET_DEFAULT_CONFIG_FACTORY();

@Component({
  standalone: true,
  selector: 'app-fieldset-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './fieldset-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './fieldset-demo.component.scss',
  ],
})
export class FieldsetDemoComponent {
  protected _inputControlConfig: DemoControlConfig<FieldsetInputControls> = {
    size: {
      description: 'Fieldset size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Fieldset variant.',
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    legend: {
      description: 'Fieldset legend.',
      type: 'string',
      default: '-',
      demoDefault: 'Personal data',
    },
  };

  protected _helperControlConfig: DemoControlConfig<FieldsetHelperControls> = {
    showMessage: {
      description: 'Whether to show fieldset message or not.',
      type: 'boolean',
      default: true,
      control: 'checkbox',
    },
  };

  public defaults = getDefaultFromDemoConfig<FieldsetInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<FieldsetHelperControls>(this._helperControlConfig);

  public model: FieldsetInputControls = { ...this.defaults };
  public helperModel: FieldsetHelperControls = { ...this.helperDefaults };

  public first = 'John';
  public last = 'Wick';
  public middle = 'Sam';

  public reset(): void {
    this.model = { ...this.defaults };
    this.first = 'John';
    this.last = 'Wick';
    this.middle = 'Sam';
  }
}
