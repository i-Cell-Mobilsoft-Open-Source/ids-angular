import { IdsInputType } from './types/input.type';

import { ErrorStateTracker, ErrorStateMatcher } from '../../common/error/error-state';
import { FormElementBase, IDS_FORM_ELEMENT } from '../../public-api';

import { Platform } from '@angular/cdk/platform';
import { ChangeDetectorRef, computed, Directive, effect, ElementRef, HostBinding, inject, Injector, input, isDevMode, DoCheck, signal, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

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
      provide: IDS_FORM_ELEMENT,
      useExisting: IdsInputDirective,
    },
  ],
})
export class IdsInputDirective implements DoCheck, FormElementBase {
  private readonly _componentClass = 'ids-paginator';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _elementRef = inject<ElementRef<HTMLInputElement> | ElementRef<HTMLTextAreaElement>>(ElementRef);
  private readonly _platform = inject(Platform);
  public readonly controlDir = this._injector.get(NgControl, null, { optional: true });
  private readonly _errorStateTracker?: ErrorStateTracker;

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
  public errorStateMatcher = input<ErrorStateMatcher>();

  public inputId = computed(() => this.id() || this._uniqueId);
  private _hostClasses = computed(() => createClassList(this._componentClass, []),
  );

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
}
