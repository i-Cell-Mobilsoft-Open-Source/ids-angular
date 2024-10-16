import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsPositionType, IdsSize, IdsSizeType, IdsOrientationType, IdsOrientation, IdsPosition } from '@i-cell/ids-angular/core';
import { IDS_RADIO_DEFAULT_CONFIG_FACTORY, IdsRadioGroupDirective, IdsRadioItemComponent, IdsRadioVariant, IdsRadioVariantType } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

type RadioPublicApi = {
  name: string
  required: boolean,
  disabled: boolean,
  size: IdsSizeType,
  variant: IdsRadioVariantType,
  orientation: IdsOrientationType,
  labelPosition: IdsPositionType,
};

type RadioHelperControls = {
  onlyOneItemIsDisabled: boolean,
};

const defaultConfig = IDS_RADIO_DEFAULT_CONFIG_FACTORY();

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

  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsRadioVariantType>(IdsRadioVariant);
  public orientations = Object.values<IdsOrientationType>(IdsOrientation);
  public labelPositions = Object.values<IdsPositionType>(IdsPosition);

  public reset(): void {
    this.value = undefined;
    this.model = { ...this.defaults };
  }
}
