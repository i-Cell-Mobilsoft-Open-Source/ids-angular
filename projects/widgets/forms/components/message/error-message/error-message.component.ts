import { IdsErrorDefinitionDirective } from './error-definition.directive';

import { IdsMessageSuffixDirective } from '../../../directives/message-suffix.directive';
import { IdsMessageDirective } from '../../../directives/message.directive';
import { IdsErrorMessageMapping } from '../types/error-message-mapping';

import { Component, ViewEncapsulation, computed, contentChildren, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { AbstractControl } from '@angular/forms';
import { ComponentBase, IDS_CONTROL_CONTAINER, IdsControlAccessor } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { of, startWith, switchMap } from 'rxjs';

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

  private readonly _controlContainer = inject(IDS_CONTROL_CONTAINER, {
    skipSelf: true,
    optional: true,
  });

  private readonly _fallbackControlDir = signal<IdsControlAccessor | null>(null);

  private readonly _controlDir =
    this._controlContainer?.controlDir ?? this._fallbackControlDir;

  private readonly _control = computed<AbstractControl | null>(() =>
    this._controlDir()?.control ?? null,
  );

  private readonly _controlStateChanges = toSignal(
    toObservable(this._control).pipe(
      switchMap((control) =>
        control?.events.pipe(startWith(null)) ?? of(null),
      ),
    ),
    {
      initialValue: null,
      equal: () => false,
    },
  );

  private readonly _errorDefDirs = contentChildren(IdsErrorDefinitionDirective);

  private readonly _errorDefs = computed(() => this._errorDefDirs().map((errorDefDir) =>
    errorDefDir.toErrorMessageMapping(),
  ));

  protected readonly _useValidationMode = computed(() => this._control() !== null && this._errorDefs().length > 0);

  protected readonly _validationError = computed<IdsErrorMessageMapping | null>(() => {
    this._controlStateChanges();

    if (!this._useValidationMode()) {
      return null;
    }

    const control = this._control();
    if (!control?.errors || control.status !== 'INVALID') {
      return null;
    }

    if (!control.touched && !control.dirty) {
      return null;
    }

    return this._selectMostImportantValidationError(control);
  });

  protected readonly _shouldRender = computed(() => {
    if (!this._useValidationMode()) {
      return true;
    }

    return this._validationError() !== null;
  });

  protected readonly _hostClasses = computed(() => this._getHostClasses([]));

  public readonly suffixes = contentChildren(IdsMessageSuffixDirective);

  private _selectMostImportantValidationError(
    control: AbstractControl,
  ): IdsErrorMessageMapping | null {
    const errorDefs = this._errorDefs();

    if (!errorDefs.length || !control.errors) {
      return null;
    }

    const errorCodes = new Set(Object.keys(control.errors));

    return errorDefs.find((errorDef) => errorCodes.has(errorDef.code)) ?? null;
  }

  protected _getValidationErrorMessage(
    messageOrFn: IdsErrorMessageMapping['message'],
  ): string {
    return messageOrFn instanceof Function ? messageOrFn() : messageOrFn;
  }
}
