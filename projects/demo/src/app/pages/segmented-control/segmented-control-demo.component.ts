import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control/segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlDirective } from '@i-cell/ids-angular/segmented-control/segmented-control.directive';
import { TranslateModule } from '@ngx-translate/core';

type SegmentedControlPublicApi = {
  size: SizeType,
  variant: SegmentedControlVariantType,
  appearance: SegmentedControlAppearanceType,
  disabled: boolean,
};

type SegmentedControlHelperControls = {
  itemHasLabel: boolean,
  itemHasIcon: boolean,
  itemHasSuffix: boolean,
  onlyOneItemIsDisabled: boolean,
};

const defaultConfig = IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-segmented-control-demo',
  standalone: true,
  imports: [
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    IdsIconComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-demo.component.scss',
  ],
})
export class SegmentedControlDemoComponent {
  public defaults: SegmentedControlPublicApi & SegmentedControlHelperControls = {
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    appearance: defaultConfig.appearance,
    disabled: false,
    itemHasLabel: true,
    itemHasIcon: true,
    itemHasSuffix: true,
    onlyOneItemIsDisabled: false,
  };

  public model: SegmentedControlPublicApi & SegmentedControlHelperControls = { ...this.defaults };

  public singleSelectionValue = undefined;
  public multiSelectionValue = [];

  public sizes = Object.values<SizeType>(Size);
  public variants = Object.values<SegmentedControlVariantType>(SegmentedControlVariant);
  public appearances = Object.values<SegmentedControlAppearanceType>(SegmentedControlAppearance);
  
  public reset(): void {
    this.singleSelectionValue = undefined;
    this.multiSelectionValue = [];
    this.model = { ...this.defaults };
  }
}
