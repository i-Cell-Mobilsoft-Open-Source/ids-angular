import { InputSignal, InputSignalWithTransform, Signal } from '@angular/core';

export abstract class SegmentedControlItem {
  public selected!: Signal<boolean>;
  public name!: InputSignal<string | undefined>;
  public value!: InputSignal<unknown>;
  public label!: InputSignal<string | undefined>;
  public ariaLabel!: InputSignal<string>;
  public ariaLabelledBy!: InputSignal<string>;
  public tabIndex!: InputSignalWithTransform<number, unknown>;
  public disabled!: InputSignal<boolean>;
  public onClick!: () => void;
  public focus!: () => void;
};
