import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

export abstract class AbstractSuccessStateMatcher {
  public abstract isSuccessState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean;
}

@Injectable({ providedIn: 'root' })
export class SuccessStateMatcher extends AbstractSuccessStateMatcher {
  public isSuccessState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.valid && (control.touched || (form && form.submitted)));
  }
}

export class SuccessStateTracker {
  /** Whether the tracker is currently in an success state. */
  public hasSuccessState = false;

  constructor(
    private _matcher: SuccessStateMatcher | null,
    private _ngControl: NgControl | null,
    private _parentFormGroup: FormGroupDirective | null,
    private _parentForm: NgForm | null,
    private _stateChanges?: Subject<void>,
  ) {}

  /** Updates the success state based on the provided success state matcher. */
  public updateSuccessState(): void {
    const oldState = this.hasSuccessState;
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this._matcher;
    const control = this._ngControl ? (this._ngControl.control as AbstractControl) : null;
    const newState = matcher?.isSuccessState(control, parent) ?? false;

    if (newState !== oldState) {
      this.hasSuccessState = newState;
      this._stateChanges?.next();
    }
  }
}
