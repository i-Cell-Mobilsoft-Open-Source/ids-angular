import { AbstractErrorStateMatcher, ErrorStateTracker } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateTracker } from '../../common/success/success-state';

import { booleanAttribute, computed, Directive, effect, ElementRef, inject, Injector, input, OnInit, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import { Subject, Subscription } from 'rxjs';

export const formFieldControlClass = 'ids-form-field-control';

@Directive()
export abstract class IdsFormFieldControl<D = unknown> extends ComponentBaseWithDefaults<D> implements OnInit {
  protected readonly _injector = inject(Injector);
  protected readonly _parentForm = inject(NgForm, { optional: true });
  protected readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });

  public readonly  ngControl = signal<NgControl | null>(null);

  public readonly errorStateChanges = new Subject<void>();
  public readonly successStateChanges = new Subject<void>();

  public readonly canHandleSuccessState = input<boolean>(false);

  public readonly hasErrorState = signal<boolean>(false);
  public readonly hasSuccessState = signal<boolean>(false);

  protected abstract readonly _elementRef: ElementRef;

  public abstract readonly errorStateMatcher: Signal<AbstractErrorStateMatcher>;
  public abstract readonly successStateMatcher: Signal<AbstractSuccessStateMatcher>;

  private _canHandleSuccessStateEffect = effect(() => {
    this._setSuccessStateTracker(this.canHandleSuccessState());
  });

  /** Handles the `disabled` input binding */
  public readonly disabledInput = input<boolean, unknown>(false, { transform: booleanAttribute, alias: 'disabled' });
  /** Stores the `disabled` state internally */
  protected readonly _disabled = signal(this.disabledInput());
  /** The input's `disabled` state as a read-only signal (to enable/disable the contol programmatically, use the FormControl's related API) */
  public readonly disabled = computed(() => this._disabled());

  public readonly readonly = input<boolean, unknown>(false, { transform: booleanAttribute });

  /** This effect is triggered if the `disabled` attribute binding changes and delegates the change to the underlying FormControl */
  private _disabledInputEffect = effect(() => {
    const enableOrDisable = this.disabledInput() ? 'disable' : 'enable';
    const controlDir = this.ngControl();

    // The NgControl's `control` property might not be initialized so we delay the enable/disable call
    // (the FormControl's enable/disable method call will trigger a StatusChangeEvent and/or the ControlValueAccessor's setDisabledState() callback
    // so that we can update the `disabled` signal)
    queueMicrotask(() => controlDir?.control?.[enableOrDisable]());
  });

  public readonly required = input<boolean, unknown>(false, { transform: booleanAttribute });

  public readonly placeholder = input<string>('');

  public abstract onContainerClick(event: MouseEvent): void;

  protected _errorStateTracker?: ErrorStateTracker;
  protected _successStateTracker?: SuccessStateTracker;
  private _successStateSubscription?: Subscription;

  constructor() {
    super();

    // Get the NgControl reference as soon as we can
    queueMicrotask(() => this.ngControl.set(this._injector.get(NgControl, null, { self: true })));
  }

  public ngOnInit(): void {
    this._initErrorStateTracker();
  }

  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  protected _initErrorStateTracker(): void {
    this._errorStateTracker = new ErrorStateTracker(
      this.errorStateMatcher(),
      this.ngControl(),
      this._parentFormGroup,
      this._parentForm,
      this.errorStateChanges,
    );

    this.errorStateChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this.hasErrorState.set(this._errorStateTracker!.hasErrorState));

    this._errorStateTracker.updateErrorState();
  }

  protected _setSuccessStateTracker(canHandleSuccessState: boolean): void {
    if (canHandleSuccessState) {
      this._successStateTracker = new SuccessStateTracker(
        this.successStateMatcher(),
        this.ngControl(),
        this._parentFormGroup,
        this._parentForm,
        this.successStateChanges,
      );

      this._successStateSubscription = this.successStateChanges.pipe(
        takeUntilDestroyed(this._destroyRef),
      ).subscribe(() => this.hasSuccessState.set(this._successStateTracker!.hasSuccessState));

      this._successStateTracker.updateSuccessState();
    } else {
      this._successStateTracker = undefined;
      this._successStateSubscription?.unsubscribe();
      this.hasSuccessState.set(false);
    }
  }
}
