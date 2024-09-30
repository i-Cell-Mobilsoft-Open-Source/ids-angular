import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsSwitchComponent, IdsSwitchGroupComponent, SwitchIconPosition, SwitchIconPositionType, SwitchLabelPosition, SwitchLabelPositionType, SwitchVariant, SwitchVariantType } from '@i-cell/ids-angular/switch';
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

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [
    IdsSwitchComponent,
    IdsSwitchGroupComponent,
    TranslateModule,
    UpperCasePipe,
    FormsModule,
  ],
  templateUrl: './switch-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './switch-demo.component.scss',
  ],
})
export class SwitchDemoComponent {
  public model: SwitchPublicApi = {
    label: 'Switch label',
    required: false,
    readonly: false,
    size: Size.COMPACT,
    variant: SwitchVariant.SURFACE,
    hasIcon: true,
    iconPosition: SwitchIconPosition.ONHANDLE,
    labelPosition: SwitchLabelPosition.RIGHT,
    disabled: false,
    ariaLabel: '',
    ariaLabelledBy: '',
    ariaDescribedBy: '',
  };

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SwitchVariant) as SwitchVariantType[];
  public iconPositions = Object.values(SwitchIconPosition) as SwitchIconPositionType[];
  public labelPositions = Object.values(SwitchLabelPosition) as SwitchLabelPositionType[];
}
