import { IDS_FORM_FIELD_DEFAULT_OPTIONS, IDS_FORM_FIELD_DEFAULT_OPTIONS_FACTORY } from './ids-form-field-default-options';
import { FormFieldVariantType } from './types/ids-form-field-variant.type';

import { IdsActionDirective } from '../../directives/ids-action.directive';
import { IdsPrefixDirective } from '../../directives/ids-prefix.directive';
import { IdsSuffixDirective } from '../../directives/ids-suffix.directive';
import { IDS_FORM_FIELD } from '../../tokens/form';
import { IdsValidators } from '../../validators';
import { IdsErrorMessageComponent } from '../message/ids-error-message/ids-error-message.component';
import { IdsHintMessageComponent } from '../message/ids-hint-message/ids-hint-message.component';
import { IdsSuccessMessageComponent } from '../message/ids-success-message/ids-success-message.component';

import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChild, contentChildren, HostBinding, inject, Injector, input, isDevMode, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { createClassList, createComponentError, SizeType } from '@i-cell/ids-angular/core';
import { Subject, takeUntil } from 'rxjs';

const defaultOptions = IDS_FORM_FIELD_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-form-field',
  standalone: true,
  imports: [],
  templateUrl: './ids-form-field.component.html',
  styleUrl: './ids-form-field.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsFormFieldComponent implements AfterContentInit, OnDestroy {
  private readonly _componentClass = 'ids-form-field';
  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_FORM_FIELD_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private readonly _destroyed = new Subject<void>();

  private _child = contentChild(IDS_FORM_FIELD);
  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
  private _successMessages = contentChildren(IdsSuccessMessageComponent, { descendants: true });
  private _errorMessages = contentChildren(IdsErrorMessageComponent, { descendants: true });
  private _actions = contentChildren(IdsActionDirective);
  private _prefixes = contentChildren(IdsPrefixDirective);
  private _suffixes = contentChildren(IdsSuffixDirective);

  public hasActions = computed(() => Boolean(this._actions().length));
  public hasLeadingIcon = computed(() => Boolean(this._prefixes().filter((prefix) => prefix.isLeadingIcon).length));
  public hasPrefix = computed(() => Boolean(this._prefixes().filter((prefix) => !prefix.isLeadingIcon).length));
  public hasSuffix = computed(() => Boolean(this._suffixes().filter((suffix) => !suffix.isTrailingIcon).length));
  public hasTrailingIcon = computed(() => Boolean(this._suffixes().filter((suffix) => suffix.isTrailingIcon).length));
  public inputId = computed(() => this._child()?.inputId());
  public size = input<SizeType | null>(this._defaultOptions.size);
  public variant = input<FormFieldVariantType | null>(this._defaultOptions.variant);
  private _control = computed(() => this._child()?.controlDir);
  private _disabled = computed(() => Boolean(this._child()?.isDisabled()));
  private _hasErrorState = computed(() => Boolean(this._child()?.hasErrorState()));
  private _hasSuccessState = computed(() => Boolean(this._child()?.hasSuccessState()));
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.size(),
    this.variant(),
    this._disabled() ? 'disabled' : null,
    this._hasErrorState() ? 'invalid' : null,
    this._hasSuccessState() ? 'valid' : null,
  ]),
  );

  public displayedMessages = computed<'error' | 'success' | 'hint' | undefined>(() => {
    if (this._errorMessages().length > 0 && this._hasErrorState()) {
      return 'error';
    }
    if (this._successMessages().length > 0 && this._hasSuccessState()) {
      return 'success';
    }
    if (this._hintMessages().length > 0) {
      return 'hint';
    }
    return undefined;
  });

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  public ngAfterContentInit(): void {
    if (isDevMode() && !this._child()) {
      throw new Error(createComponentError(this._componentClass, 'no form element was provided'));
    }
    this._child()?.controlDir?.statusChanges?.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  public get hasRequiredValidator(): boolean {
    const control = this._control()?.control;
    if (!control) {
      return Boolean(this._child()?.required());
    }
    return control.hasValidator(Validators.required)
      || control.hasValidator(Validators.requiredTrue)
      || control.hasValidator(IdsValidators.required)
      || control.hasValidator(IdsValidators.requiredTrue)
      || control.hasValidator(IdsValidators.requiredFalse);
  }

  public containerClick(): void {
    const containerClick = this._child()?.onContainerClick;
    if (containerClick) {
      containerClick();
    }
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
  }
}
