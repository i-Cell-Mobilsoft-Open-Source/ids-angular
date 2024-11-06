import { IdsSegmentedControlAppearanceType } from './segmented-control-appearance.type';
import { IdsSegmentedControlVariantType } from './segmented-control-variant.type';

import { InputSignal, OutputEmitterRef, Signal } from '@angular/core';
import { IdsSizeType } from '@i-cell/ids-angular/core';

export abstract class SegmentedControl<I, E> {
  public name!: InputSignal<string | undefined>;
  public size!: InputSignal<IdsSizeType>;
  public variant!: InputSignal<IdsSegmentedControlVariantType>;
  public appearance!: InputSignal<IdsSegmentedControlAppearanceType>;
  public multiSelect?: InputSignal<boolean>;
  public disabled!: Signal<boolean>;
  public valueCompareFn?: (o1: I, o2: I) => boolean;
  public itemChanges!: OutputEmitterRef<E>;
  public isItemPreSelectedByValue!: (itemValue: unknown) => boolean;
};
