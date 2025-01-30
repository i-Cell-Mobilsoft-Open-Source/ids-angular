import { IdsErrorDefinitionDirective } from './error-definition.directive';

import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';
import { IdsFormFieldComponent } from '../../form-field/form-field.component';
import { IdsErrorMessageMapping } from '../types/error-message-mapping';

import { Component, ViewEncapsulation, computed, contentChildren, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { AbstractControl, FormControlStatus } from '@angular/forms';
import { ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { map, Observable, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'ids-error-message',
  imports: [IdsIconComponent],
  templateUrl: './error-message.component.html',
  hostDirectives: [IdsMessageDirective],
  encapsulation: ViewEncapsulation.None,
})
export class IdsErrorMessageComponent extends ComponentBase {
  protected override get _hostName(): string {
    return 'error-message';
  }

  private _parent = inject(IdsFormFieldComponent, { skipSelf: true });

  private _control = signal<AbstractControl | null>(null);
  private _errorDefDirs = contentChildren(IdsErrorDefinitionDirective);
  private _errorDefs = computed(() => this._errorDefDirs().map((errorDefDir) => errorDefDir.toErrorMessageMapping()));

  protected _validationError = signal<IdsErrorMessageMapping | null>(null);

  protected _hostClasses = computed(() => this._getHostClasses([]));

  public suffixes = contentChildren(IdsMessageSuffixDirective);

  constructor() {
    super();
    toObservable(this._parent.control).pipe(
      tap((controlDir) => this._control.set(controlDir?.control ?? null)),
      map((controlDir) => controlDir?.statusChanges ?? of(null)),
      switchMap((statusChanges: Observable<FormControlStatus | null>) => statusChanges),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((status) => {
      if (status === 'INVALID') {
        const nextError = this._selectMostImportantValidationError();
        this._validationError.set(nextError);
      } else {
        this._validationError.set(null);
      }
    });
  }

  private _selectMostImportantValidationError(): IdsErrorMessageMapping | null {
    const errorDefs = this._errorDefs();
    const control = this._control();

    if (!errorDefs?.length || !control?.errors || Object.keys(control.errors).length === 0) {
      return null;
    }

    const errorCodes = new Set(Object.keys(control.errors));

    return errorDefs.find((errorDef) => errorCodes.has(errorDef.code)) ?? null;
  }

  protected _getValidationErrorMessage(messageOrFn: IdsErrorMessageMapping['message']): string {
    return messageOrFn instanceof Function ? messageOrFn() : messageOrFn;
  }
}
