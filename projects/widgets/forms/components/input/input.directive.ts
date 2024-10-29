import { IDS_INPUT_DEFAULT_CONFIG, IDS_INPUT_DEFAULT_CONFIG_FACTORY } from './input-defaults';
import { IdsInputType } from './types/input.type';

import { AbstractErrorStateMatcher, ErrorStateTracker } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher, SuccessStateTracker } from '../../common/success/success-state';
import { formFieldControlClass, IdsFormFieldControl } from '../form-field/form-field-control';
import { IDS_FORM_FIELD_CONTROL } from '../form-field/tokens/form-field-tokens';

import { computed, Directive, effect, ElementRef, inject, input, isDevMode, DoCheck, signal, OnDestroy, OnInit } from '@angular/core';
import { FormGroupDirective, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';
import { Subject, takeUntil } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_INPUT_DEFAULT_CONFIG_FACTORY();

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
    '[id]': 'id()',
    '[class]': '_hostClasses()',
    '[attr.placeholder]': 'placeholder()',
    '[attr.disabled]': 'isDisabled() || null',
    '(focus)': '_focusChanged(true)',
    '(blur)': '_focusChanged(false)',
  },
})
export class IdsInputDirective implements IdsFormFieldControl, OnInit, DoCheck, OnDestroy {
  private readonly _componentClass = 'ids-input';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_INPUT_DEFAULT_CONFIG, { optional: true }),
  };

  public readonly errorStateChanges = new Subject<void>();
  public readonly successStateChanges = new Subject<void>();
  private readonly _destroyed = new Subject<void>();
  public readonly ngControl = inject(NgControl, { optional: true });

  private _focused = false;
  private _errorStateTracker?: ErrorStateTracker;
  private _successStateTracker?: SuccessStateTracker;

  public id = input<string>(this._uniqueId);
  public placeholder = input<string>('');
  public name = input<string>();
  public type = input<IdsInputType>('text');
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public readonly = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  private _controlDisabled = signal(false);
  public isDisabled = computed(() => this.disabled() || this._controlDisabled());
  public canHandleSuccessState = input<boolean>(false);
  public errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultOptions.errorStateMatcher));
  public successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultOptions.successStateMatcher));

  public inputId = computed(() => this.id() || this._uniqueId);
  private _hostClasses = computed(() => createClassList(this._componentClass, [], [formFieldControlClass]),
  );

  public hasErrorState = signal<boolean>(false);
  public hasSuccessState = signal<boolean>(false);

  constructor() {
    effect(() => {
      this._validateType(this.type());
    });
  }

  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  public ngOnInit(): void {
    this._initErrorStateTracker();
    this._initSuccessStateTracker();
  }

  protected _initErrorStateTracker(): void {
    this._errorStateTracker = new ErrorStateTracker(
      this.errorStateMatcher(),
      this.ngControl,
      this._parentFormGroup,
      this._parentForm,
      this.errorStateChanges,
    );

    this.errorStateChanges.pipe(
      takeUntil(this._destroyed),
    ).subscribe(() => this.hasErrorState.set(this._errorStateTracker!.hasErrorState));
  }

  protected _initSuccessStateTracker(): void {
    if (this.canHandleSuccessState()) {
      this._successStateTracker = new SuccessStateTracker(
        this.successStateMatcher(),
        this.ngControl,
        this._parentFormGroup,
        this._parentForm,
        this.successStateChanges,
      );

      this.successStateChanges.pipe(
        takeUntil(this._destroyed),
      ).subscribe(() => this.hasSuccessState.set(this._successStateTracker!.hasSuccessState));
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

  public ngOnDestroy(): void {
    this._destroyed.next();
    this._destroyed.complete();
  }
}
