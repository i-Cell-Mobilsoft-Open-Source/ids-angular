import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchComponent, IdsSwitchGroupComponent, SwitchIconPosition, SwitchIconPositionType, SwitchLabelPosition, SwitchLabelPositionType, SwitchVariant, SwitchVariantType } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

type SwitchPublicApi = {
  label: string,
  required: boolean,
  readonly: boolean,
  size: SizeType,
  variant: SwitchVariantType,
  hasIcon: boolean,
  iconPosition: SwitchIconPositionType,
  labelPosition: SwitchLabelPositionType,
  disabled: boolean,
  ariaLabel: string,
  ariaLabelledBy: string,
  ariaDescribedBy: string,
};

type SwitchGroupPublicApi = {
  size: SizeType,
  hasIcon: boolean,
  iconPosition: SwitchIconPositionType,
  labelPosition: SwitchLabelPositionType,
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

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SwitchVariant) as SwitchVariantType[];
  public iconPositions = Object.values(SwitchIconPosition) as SwitchIconPositionType[];
  public labelPositions = Object.values(SwitchLabelPosition) as SwitchLabelPositionType[];

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
