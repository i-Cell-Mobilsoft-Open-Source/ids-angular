import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchComponent, IdsSwitchGroupComponent, IdsSwitchIconPosition, IdsSwitchIconPositionType, IdsSwitchLabelPosition, IdsSwitchLabelPositionType, IdsSwitchVariant, IdsSwitchVariantType } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

type SwitchPublicApi = {
  label: string,
  required: boolean,
  readonly: boolean,
  size: IdsSizeType,
  variant: IdsSwitchVariantType,
  hasIcon: boolean,
  iconPosition: IdsSwitchIconPositionType,
  labelPosition: IdsSwitchLabelPositionType,
  disabled: boolean,
  ariaLabel: string,
  ariaLabelledBy: string,
  ariaDescribedBy: string,
};

type SwitchGroupPublicApi = {
  size: IdsSizeType,
  hasIcon: boolean,
  iconPosition: IdsSwitchIconPositionType,
  labelPosition: IdsSwitchLabelPositionType,
};

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [
    IdsSwitchComponent,
    IdsSwitchGroupComponent,
    TranslateModule,
    UpperCasePipe,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './switch-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './switch-demo.component.scss',
  ],
})
export class SwitchDemoComponent {
  public switchDefaults: SwitchPublicApi = {
    label: 'Switch label',
    required: false,
    readonly: false,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    hasIcon: defaultConfig.hasIcon,
    iconPosition: defaultConfig.iconPosition,
    labelPosition: defaultConfig.labelPosition,
    disabled: false,
    ariaLabel: '',
    ariaLabelledBy: '',
    ariaDescribedBy: '',
  };

  public model: SwitchPublicApi = { ...this.switchDefaults };

  public switchGroupDefaults: SwitchGroupPublicApi = {
    size: defaultConfig.size,
    hasIcon: defaultConfig.hasIcon,
    iconPosition: defaultConfig.iconPosition,
    labelPosition: defaultConfig.labelPosition,
  };

  public groupModel: SwitchGroupPublicApi = { ...this.switchGroupDefaults };

  public value = true;
  // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
  public groupValue = [true, true, true];

  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsSwitchVariantType>(IdsSwitchVariant);
  public iconPositions = Object.values<IdsSwitchIconPositionType>(IdsSwitchIconPosition);
  public labelPositions = Object.values<IdsSwitchLabelPositionType>(IdsSwitchLabelPosition);

  public resetSwitch(): void {
    this.value = true;
    this.model = { ...this.switchDefaults };
  }

  public resetSwitchGroup(): void {
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    this.groupValue = [true, true, true];
    this.groupModel = { ...this.switchGroupDefaults };
  }
}
