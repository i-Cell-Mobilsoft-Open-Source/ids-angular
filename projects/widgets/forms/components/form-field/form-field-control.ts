import { Signal } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';

export const formFieldControlClass = 'ids-form-field-control';

export abstract class IdsFormFieldControl {
  public readonly errorStateChanges!: Observable<void>;
  public readonly successStateChanges!: Observable<void>;
  public readonly id!: Signal<string>;
  public readonly placeholder!: Signal<string>;
  public readonly ngControl!: Signal<NgControl | null>;
  public readonly disabled!: Signal<boolean>;
  public readonly required!: Signal<boolean>;
  public readonly hasErrorState!: Signal<boolean>;
  public readonly hasSuccessState!: Signal<boolean>;
  public readonly controlType?: Signal<string>;
  public readonly autofilled?: Signal<boolean>;
  public readonly userAriaDescribedBy?: Signal<string>;
  public readonly disableAutomaticLabeling?: Signal<boolean>;
  public abstract setDescribedByIds(ids: string[]): void;
  public abstract onContainerClick(event: MouseEvent): void;
}
