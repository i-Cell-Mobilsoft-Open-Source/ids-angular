import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { PositionType, Size, SizeType, OrientationType, Orientation, Position } from '@i-cell/ids-angular/core';
import { IDS_RADIO_DEFAULT_OPTIONS_FACTORY, IdsRadioGroupDirective, IdsRadioItemComponent, RadioVariant, RadioVariantType } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

type RadioPublicApi = {
  name: string
  required: boolean,
  disabled: boolean,
  size: SizeType,
  variant: RadioVariantType,
  orientation: OrientationType,
  labelPosition: PositionType,
};

type RadioHelperControls = {
  onlyOneItemIsDisabled: boolean,
};

const defaultConfig = IDS_RADIO_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'app-radio-demo',
  standalone: true,
  imports: [
    IdsRadioGroupDirective,
    IdsRadioItemComponent,
    FormsModule,
    UpperCasePipe,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './radio-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './radio-demo.component.scss',
  ],
})
export class RadioDemoComponent {
  public defaults: RadioPublicApi & RadioHelperControls = {
    name: 'numbers',
    required: false,
    disabled: false,
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    orientation: defaultConfig.orientation,
    labelPosition: defaultConfig.labelPosition,
    onlyOneItemIsDisabled: false,
  };

  public model: RadioPublicApi & RadioHelperControls = { ...this.defaults };

  public value = undefined;

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(RadioVariant) as RadioVariantType[];
  public orientations = Object.values(Orientation) as OrientationType[];
  public labelPositions = Object.values(Position) as PositionType[];

  public reset(): void {
    this.value = undefined;
    this.model = { ...this.defaults };
  }
}
