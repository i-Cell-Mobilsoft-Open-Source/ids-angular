import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent, SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { mdiAccount, mdiAlarm, mdiLightbulbOnOutline } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-demo',
  standalone: true,
  imports: [
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    IdsIconComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrl: './segmented-control-toggle-demo.component.scss',
})
export class SegmentedControlToggleDemoComponent {
  public icon = {
    lightbulb: mdiLightbulbOnOutline,
    account: mdiAccount,
    alarm: mdiAlarm,
  };

  public sizes: SizeType[] = [
    Size.DENSE,
    Size.COMPACT,
    Size.COMFORTABLE,
    Size.SPACIOUS,
  ];

  public variants: SegmentedControlVariantType[] = [
    SegmentedControlVariant.PRIMARY,
    SegmentedControlVariant.SURFACE,
    SegmentedControlVariant.LIGHT,
    SegmentedControlVariant.DARK,
  ];

  public appearances: SegmentedControlAppearanceType[] = [
    SegmentedControlAppearance.FILLED,
    SegmentedControlAppearance.OUTLINED,
  ];
}
