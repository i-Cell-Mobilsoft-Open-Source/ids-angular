import { Injectable, signal } from '@angular/core';
import { AbstractControl, FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorStateMatcher {
  public isErrorState(control: AbstractControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.touched || (form && form.submitted)));
  }
}

export class ErrorStateTracker {
  /** Whether the tracker is currently in an error state. */
  public errorState = signal<boolean>(false);

  /** User-defined matcher for the error state. */
  public matcher?: ErrorStateMatcher;

  constructor(
    private _defaultMatcher: ErrorStateMatcher | null,
    public ngControl: NgControl | null,
    private _parentFormGroup: FormGroupDirective | null,
    private _parentForm: NgForm | null,
    private _stateChanges?: Subject<void>,
  ) {}

  /** Updates the error state based on the provided error state matcher. */
  public updateErrorState(): void {
    const oldState = this.errorState();
    const parent = this._parentFormGroup || this._parentForm;
    const matcher = this.matcher || this._defaultMatcher;
    const control = this.ngControl ? (this.ngControl.control as AbstractControl) : null;
    const newState = matcher?.isErrorState(control, parent) ?? false;

    if (newState !== oldState) {
      this.errorState.set(newState);
      this._stateChanges?.next();
    }
  }
}
