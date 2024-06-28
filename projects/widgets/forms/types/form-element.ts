import { InputSignal, Signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SizeType } from '@i-cell/widgets/core';

export interface FormElement<VariantT> {
  id: InputSignal<string>
  size: InputSignal<SizeType | null>
  variant: InputSignal<VariantT | null>
  isDisabled: Signal<boolean>
  controlDir: NgControl | null
}
