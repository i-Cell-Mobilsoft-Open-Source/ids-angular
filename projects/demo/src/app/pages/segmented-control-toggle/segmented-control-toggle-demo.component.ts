import { UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, viewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent, SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { mdiAccount, mdiAlarm, mdiLightbulbOnOutline } from '@mdi/js';
import { Subscription } from 'rxjs';

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
  ],
  templateUrl: './segmented-control-toggle-demo.component.html',
  styleUrl: './segmented-control-toggle-demo.component.scss',
})
export class SegmentedControlToggleDemoComponent implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();
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

  public form = new FormGroup({
    singleSelection: new FormControl<string>('first'),
  });

  public testSegmentedControl = viewChildren(IdsSegmentedControlToggleDirective);

  public ngOnInit(): void {
    this._subscription.add(this.form.controls.singleSelection.valueChanges.subscribe((change) => {
      console.info('Form control valueChanges:', change);
    }));

    this.testSegmentedControl().forEach((control) => {
      this._subscription.add(control?.itemChanges.subscribe((change) => {
        console.info('Segmented control itemChanges:', change);
      }));
    });
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
