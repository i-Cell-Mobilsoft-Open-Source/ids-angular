import { UpperCasePipe } from '@angular/common';
import { Component, OnDestroy, OnInit, viewChildren } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Size, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { SegmentedControlAppearance, SegmentedControlAppearanceType, SegmentedControlVariant, SegmentedControlVariantType } from '@i-cell/ids-angular/segmented-control';
import { IdsSegmentedControlDirective } from '@i-cell/ids-angular/segmented-control/ids-segmented-control.directive';
import { IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control/segmented-control-item/ids-segmented-control-item.component';
import { mdiAccount, mdiAlarm, mdiLightbulbOnOutline } from '@mdi/js';
import { Subscription } from 'rxjs';

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
  ],
  templateUrl: './segmented-control-demo.component.html',
  styleUrl: './segmented-control-demo.component.scss',
})
export class SegmentedControlDemoComponent implements OnInit, OnDestroy {
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
    singleSelection: new FormControl<string>('second'),
    multiSelection: new FormControl<string[]>([
      'first',
      'third',
    ]),
  });

  public testSegmentedControl = viewChildren(IdsSegmentedControlDirective);

  public ngOnInit(): void {
    this._subscription.add(this.form.controls.singleSelection.valueChanges.subscribe((change) => {
      console.info('Single selection form control valueChanges:', change);
    }));

    this._subscription.add(this.form.controls.multiSelection.valueChanges.subscribe((change) => {
      console.info('Multi selection form control valueChanges:', change);
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
