import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY, IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent, SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { mdiAccount, mdiAlarm, mdiLightbulbOnOutline } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

type SegmentedControlTogglePublicApi = {
  size: SizeType,
  variant: SegmentedControlVariantType,
  appearance: SegmentedControlAppearanceType,
  disabled: boolean,
};

type SegmentedControlToggleHelperControls = {
  itemHasLabel: boolean,
  itemHasIcon: boolean,
  itemHasSuffix: boolean,
  onlyOneItemIsDisabled: boolean,
};

const defaultConfig = IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'app-segmented-control-demo',
  standalone: true,
  imports: [
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    IdsIconComponent,
    UpperCasePipe,
    FormsModule,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-toggle-demo.component.scss',
  ],
})
export class SegmentedControlToggleDemoComponent {
  public defaults: SegmentedControlTogglePublicApi & SegmentedControlToggleHelperControls = {
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    appearance: defaultConfig.appearance,
    disabled: false,
    itemHasLabel: true,
    itemHasIcon: true,
    itemHasSuffix: true,
    onlyOneItemIsDisabled: false,
  };

  public model: SegmentedControlTogglePublicApi & SegmentedControlToggleHelperControls = { ...this.defaults };

  public icon = {
    lightbulb: mdiLightbulbOnOutline,
    account: mdiAccount,
    alarm: mdiAlarm,
  };

  public value = undefined;

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SegmentedControlVariant) as SegmentedControlVariantType[];
  public appearances = Object.values(SegmentedControlAppearance) as SegmentedControlAppearanceType[];
  
  public reset(): void {
    this.value = undefined;
    this.model = { ...this.defaults };
  }
}
