import { IDS_INPUT_DEFAULT_OPTIONS, IDS_INPUT_DEFAULT_OPTIONS_FACTORY } from './ids-input-default-options';
import { IdsInputType } from './types/input.type';

import { ErrorStateTracker, ErrorStateMatcher } from '../../common/error/error-state';
import { IDS_FORM_FIELD, IdsFormField } from '../../public-api';

import { computed, Directive, effect, ElementRef, HostBinding, inject, Injector, input, isDevMode, DoCheck, signal, HostListener, OnDestroy } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';
import { Subject, takeUntil } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_INPUT_DEFAULT_OPTIONS_FACTORY();

const IDS_INPUT_INVALID_TYPES: IdsInputType[] = [
  'button',
  'checkbox',
  'file',
  'hidden',
  'image',
  'radio',
  'range',
  'reset',
  'submit',
];

@Directive({
  selector: `input[idsInput][ngModel],
             input[idsInput][formControl],
             input[idsInput][formControlName],
             textarea[idsInput][ngModel],
             textarea[idsInput][formControl],
             textarea[idsInput][formControlName]`,
  exportAs: 'idsInput',
  standalone: true,
  providers: [
    {
      provide: IDS_FORM_FIELD,
      useExisting: IdsInputDirective,
    },
  ],
})
export class IdsInputDirective implements IdsFormField, DoCheck, OnDestroy {
  private readonly _componentClass = 'ids-paginator';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);
  private readonly _parentFormGroup = this._injector.get(FormGroupDirective, null, { optional: true });
  private readonly _parentForm = this._injector.get(NgForm, null, { optional: true });
  private readonly _errorStateTracker?: ErrorStateTracker;
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_INPUT_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private readonly _stateChanges = new Subject<void>();
  private readonly _destroyed = new Subject<void>();
  public readonly controlDir = this._injector.get(NgControl, null, { optional: true });

  private _focused = false;

  public id = input<string>(this._uniqueId);
  public placeholder = input<string>();
  public name = input<string>();
  public type = input<IdsInputType>('text');
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public readonly = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  private _controlDisabled = signal(false);
  public isDisabled = computed(() => this.disabled() || this._controlDisabled());
  public errorStateMatcher = input<ErrorStateMatcher>(this._defaultOptions.errorStateMatcher);

  public inputId = computed(() => this.id() || this._uniqueId);
  private _hostClasses = computed(() => createClassList(this._componentClass, []),
  );

  public hasErrorState = signal<boolean>(false);

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  @HostBinding('id') get hostId(): string {
    return this.id();
  }

  @HostListener('focus', ['$event']) private _onFocus(): void {
    this._focusChanged(true);
  }

  @HostListener('blur', ['$event']) private _onBlur(): void {
    this._focusChanged(false);
  }

  constructor() {
    effect(() => {
      this._validateType(this.type());
    });

    this._errorStateTracker = new ErrorStateTracker(
      this.errorStateMatcher(),
      this.controlDir,
      this._parentFormGroup,
      this._parentForm,
      this._stateChanges,
    );

    this._stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => this.hasErrorState.set(this._errorStateTracker!.hasErrorState));
  }

  public ngDoCheck(): void {
    if (this.controlDir) {
      this.updateErrorState();

      if (this.controlDir.disabled !== null && this.controlDir.disabled !== this.disabled()) {
        this._controlDisabled.set(this.controlDir.disabled);
      }
    }
  }

  private _validateType(type: IdsInputType): void {
    if (isDevMode() && IDS_INPUT_INVALID_TYPES.indexOf(type) > -1) {
      throw createComponentError(this._componentClass, `Input type ${type} is not supportedby idsInput`);
    }
  }

  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  private _focusChanged(isFocused: boolean): void {
    if (isFocused !== this._focused) {
      this._focused = isFocused;
    }
  }

  public updateErrorState(): void {
    this._errorStateTracker?.updateErrorState();
  }

  /**
   * Should be an arrow function in order to handle `this` outside of this class
   */
  public onContainerClick = (): void => {
    if (!this._focused && !this.readonly() && !this.isDisabled()) {
      this.focus();
    }
  };

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
