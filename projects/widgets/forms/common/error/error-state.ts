import { Injectable } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

export abstract class AbstractErrorStateMatcher {
  public abstract isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean;
}

@Injectable({ providedIn: 'root' })
export class ErrorStateMatcher extends AbstractErrorStateMatcher {
  public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}

export class ErrorStateTracker {
  /** Whether the tracker is currently in an error state. */
  public hasErrorState = false;

  constructor(
    private _matcher: ErrorStateMatcher | null,
    private _ngControl: NgControl | null,
    private _parentFormGroup: FormGroupDirective | null,
    private _parentForm: NgForm | null,
    private _stateChanges?: Subject<void>,
  ) {}

  /** Updates the error state based on the provided error state matcher. */
  public updateErrorState(): void {
    const oldState = this.hasErrorState;
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this._matcher;
    const control = this._ngControl ? (this._ngControl.control) : null;
    const newState = matcher?.isErrorState(control, parent) ?? false;

    if (newState !== oldState) {
      this.hasErrorState = newState;
      this._stateChanges?.next();
    }
  }
}
