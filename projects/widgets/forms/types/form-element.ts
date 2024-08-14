import { InputSignal, Signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SizeType } from '@i-cell/ids-angular/core';

export interface FormElement<VariantT> extends FormElementBase {
  size: InputSignal<SizeType | null>
  variant: InputSignal<VariantT | null>
}

export interface FormElementBase {
  inputId: Signal<string>
  isDisabled: Signal<boolean>
  controlDir: NgControl | null
  required: Signal<boolean>
  onContainerClick?: () => void
}
