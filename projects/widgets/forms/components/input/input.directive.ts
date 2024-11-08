import { IDS_INPUT_DEFAULT_CONFIG, IDS_INPUT_DEFAULT_CONFIG_FACTORY, IdsInputDefaultConfig } from './input-defaults';
import { IdsInputType } from './types/input.type';

import { AbstractErrorStateMatcher, ErrorStateTracker } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateTracker } from '../../common/success/success-state';
import { formFieldControlClass, IdsFormFieldControl } from '../form-field/form-field-control';
import { IDS_FORM_FIELD_CONTROL } from '../form-field/tokens/form-field-control';

import { computed, Directive, effect, ElementRef, inject, input, isDevMode, DoCheck, signal, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanAttribute, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
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
      provide: IDS_FORM_FIELD_CONTROL,
      useExisting: IdsInputDirective,
    },
  ],
  host: {
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'isDisabled() ? "" : null',
    '[attr.readonly]': 'readonly() ? "" : null',
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
  },
})
export class IdsInputDirective
  extends ComponentBaseWithDefaults<IdsInputDefaultConfig>
  implements IdsFormFieldControl, OnInit, DoCheck {
  protected override get _hostName(): string {
    return 'input';
  }

  private readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });
  private readonly _parentForm = inject(NgForm, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_INPUT_DEFAULT_CONFIG);

  public readonly errorStateChanges = new Subject<void>();
  public readonly successStateChanges = new Subject<void>();
  public readonly ngControl = inject(NgControl, { optional: true });

  private _focused = false;
  private _errorStateTracker?: ErrorStateTracker;
  private _successStateTracker?: SuccessStateTracker;
  private _successStateSubscription?: Subscription;

  public placeholder = input<string>('');
  public name = input<string>();
  public type = input<IdsInputType>('text');
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public readonly = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  private _controlDisabled = signal(false);
  public isDisabled = computed(() => this.disabled() || this._controlDisabled());
  public canHandleSuccessState = input<boolean>(false);
  public errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));

  protected _hostClasses = computed(() => this._getHostClasses([], [formFieldControlClass]),
  );

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

  protected _initErrorStateTracker(): void {
    this._errorStateTracker = new ErrorStateTracker(
      this.errorStateMatcher(),
      this.ngControl,
      this._parentFormGroup,
      this._parentForm,
      this.errorStateChanges,
    );

    this._successStateSubscription = this.errorStateChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this.hasErrorState.set(this._errorStateTracker!.hasErrorState));
  }

  protected _setSuccessStateTracker(canHandleSuccessState: boolean): void {
    if (canHandleSuccessState) {
      this._successStateTracker = new SuccessStateTracker(
        this.successStateMatcher(),
        this.ngControl,
        this._parentFormGroup,
        this._parentForm,
        this.successStateChanges,
      );

      this.successStateChanges.pipe(
        takeUntilDestroyed(this._destroyRef),
      ).subscribe(() => this.hasSuccessState.set(this._successStateTracker!.hasSuccessState));
    } else {
      this._successStateTracker = undefined;
      this._successStateSubscription?.unsubscribe();
    }
  }

  public ngDoCheck(): void {
    if (this.ngControl) {
      this.updateErrorAndSuccessState();

      if (this.ngControl.disabled !== null && this.ngControl.disabled !== this.disabled()) {
        this._controlDisabled.set(this.ngControl.disabled);
      }
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

  public updateErrorAndSuccessState(): void {
    this._errorStateTracker?.updateErrorState();
    this._successStateTracker?.updateSuccessState();
  }

  /**
   * Should be an arrow function in order to handle `this` outside of this class
   */
  public onContainerClick = (): void => {
    if (!this._focused && !this.readonly() && !this.isDisabled()) {
      this.focus();
    }
  };
}
