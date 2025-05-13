import { IDS_INPUT_DEFAULT_CONFIG, IDS_INPUT_DEFAULT_CONFIG_FACTORY, IdsInputDefaultConfig } from './input-defaults';
import { IdsInputType } from './types/input.type';

import { AbstractErrorStateMatcher } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher } from '../../common/success/success-state';
import { formFieldControlClass, IdsFormFieldControl } from '../form-field/form-field-control';
import { IDS_FORM_FIELD_CONTROL } from '../form-field/tokens/form-field-control';

import { AfterViewInit, computed, Directive, effect, ElementRef, inject, input, isDevMode, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlEvent, StatusChangeEvent } from '@angular/forms';

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
export class IdsInputDirective extends IdsFormFieldControl<IdsInputDefaultConfig> implements OnInit, AfterViewInit {
  protected override get _hostName(): string {
    return 'input';
  }

  protected readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_INPUT_DEFAULT_CONFIG);

  private _focused = false;

  public name = input<string>();
  public type = input<IdsInputType>('text');

  public readonly errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public readonly successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));

  protected _hostClasses = computed(() => this._getHostClasses([], [formFieldControlClass]));

  private _validateTypeEffect = effect(() => {
    this._validateType(this.type());
  });

  public ngAfterViewInit(): void {
    const control = this.ngControl()?.control;
    if (control) {
      this._disabled.set(control.status === 'DISABLED');
      control.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((event) => this.updateControlState(event));
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
