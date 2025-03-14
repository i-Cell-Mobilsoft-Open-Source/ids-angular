import { IDS_INPUT_DEFAULT_CONFIG, IDS_INPUT_DEFAULT_CONFIG_FACTORY, IdsInputDefaultConfig } from './input-defaults';
import { IdsInputType } from './types/input.type';

import { AbstractErrorStateMatcher, ErrorStateTracker } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateTracker } from '../../common/success/success-state';
import { formFieldControlClass, IdsFormFieldControl } from '../form-field/form-field-control';
import { IDS_FORM_FIELD_CONTROL } from '../form-field/tokens/form-field-control';

import { AfterViewInit, booleanAttribute, computed, Directive, effect, ElementRef, inject, input, isDevMode, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlEvent, FormGroupDirective, NgControl, NgForm, StatusChangeEvent } from '@angular/forms';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import { Subject, Subscription } from 'rxjs';

const defaultConfig = IDS_INPUT_DEFAULT_CONFIG_FACTORY();

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
  selector: `input[idsInput][ngModel]:not([formControl]):not([formControlName]),
             input[idsInput][formControl]:not([ngModel]):not([formControlName]),
             input[idsInput][formControlName]:not([ngModel]):not([formControl]),
             textarea[idsInput][ngModel]:not([formControl]):not([formControlName]),
             textarea[idsInput][formControl]:not([ngModel]):not([formControlName]),
             textarea[idsInput][formControlName]:not([ngModel]):not([formControl])`,
  exportAs: 'idsInput',
  standalone: true,
  providers: [
    {
      provide: IDS_FORM_FIELD_CONTROL,
      useExisting: IdsInputDirective,
    },
  ],
  host: {
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.readonly]': 'readonly() ? "" : null',
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
  },
})
export class IdsInputDirective
  extends ComponentBaseWithDefaults<IdsInputDefaultConfig>
  implements IdsFormFieldControl, OnInit, AfterViewInit {
  protected override get _hostName(): string {
    return 'input';
  }

  private readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });
  private readonly _parentForm = inject(NgForm, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_INPUT_DEFAULT_CONFIG);

  public readonly errorStateChanges = new Subject<void>();
  public readonly successStateChanges = new Subject<void>();
  public readonly ngControl = signal(inject(NgControl, { self: true }));

  private _focused = false;
  private _errorStateTracker?: ErrorStateTracker;
  private _successStateTracker?: SuccessStateTracker;
  private _successStateSubscription?: Subscription;

  public placeholder = input<string>('');
  public name = input<string>();
  public type = input<IdsInputType>('text');
  public required = input<boolean, unknown>(false, { transform: booleanAttribute });
  public readonly = input<boolean, unknown>(false, { transform: booleanAttribute });
  public canHandleSuccessState = input<boolean>(false);
  public errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));

  /** Handles the `disabled` input binding */
  public disabledInput = input<boolean, unknown>(false, { transform: booleanAttribute, alias: 'disabled' });
  /** Stores the `disabled` state internally */
  private _disabled = signal(this.disabledInput());
  /** The input's `disabled` state as a read-only signal (to enable/disable the contol programmatically, use the FormControl's related API) */
  public disabled = computed(() => this._disabled());

  /** This effect is triggered if the `disabled` attribute binding changes and delegates the change to the underlying FormControl */
  private _disabledInputEffect = effect(() => {
    const enableOrDisable = this.disabledInput() ? 'disable' : 'enable';
    const controlDir = this.ngControl();

    // The NgControl's `control` property might not be initialized so we delay the enable/disable call
    // (the FormControl's enable/disable method call will trigger a StatusChangeEvent then we can update the `disabled` signal)
    queueMicrotask(() => controlDir?.control?.[enableOrDisable]());
  });

  protected _hostClasses = computed(() => this._getHostClasses([], [formFieldControlClass]));

  public hasErrorState = signal<boolean>(false);
  public hasSuccessState = signal<boolean>(false);

  private _validateTypeEffect = effect(() => {
    this._validateType(this.type());
  });

  private _canHandleSuccessStateEffect = effect(() => {
    this._setSuccessStateTracker(this.canHandleSuccessState());
  });

  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  public ngOnInit(): void {
    this._initErrorStateTracker();
  }

  public ngAfterViewInit(): void {
    const control = this.ngControl()?.control;
    if (control) {
      this._disabled.set(control.status === 'DISABLED');
      control.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((event) => this.updateControlState(event));
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

  private _validateType(type: IdsInputType): void {
    if (isDevMode() && IDS_INPUT_INVALID_TYPES.indexOf(type) > -1) {
      throw this._createHostError(`Input type ${type} is not supportedby idsInput`);
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

  public updateControlState(event: ControlEvent): void {
    this._errorStateTracker?.updateErrorState();
    this._successStateTracker?.updateSuccessState();

    if (event instanceof StatusChangeEvent) {
      this._disabled.set(event.status === 'DISABLED');
    }
  }

  /**
   * Should be an arrow function in order to handle `this` outside of this class
   */
  public onContainerClick = (): void => {
    if (!this._focused && !this.readonly() && !this.disabled) {
      this.focus();
    }
  };
}
