import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent, SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
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
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './segmented-control-toggle-demo.component.scss',
  ],
})
export class SegmentedControlToggleDemoComponent {
  public model: SegmentedControlTogglePublicApi & SegmentedControlToggleHelperControls = {
    size: Size.COMFORTABLE,
    variant: SegmentedControlVariant.SURFACE,
    appearance: SegmentedControlAppearance.FILLED,
    disabled: false,
    itemHasLabel: true,
    itemHasIcon: true,
    itemHasSuffix: true,
    onlyOneItemIsDisabled: false,
  };

  public icon = {
    lightbulb: mdiLightbulbOnOutline,
    account: mdiAccount,
    alarm: mdiAlarm,
  };

  public sizes = Object.values(Size) as SizeType[];
  public variants = Object.values(SegmentedControlVariant) as SegmentedControlVariantType[];
  public appearances = Object.values(SegmentedControlAppearance) as SegmentedControlAppearanceType[];
}
