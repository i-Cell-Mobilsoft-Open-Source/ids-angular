import { IDS_FORM_FIELD_DEFAULT_OPTIONS, IDS_FORM_FIELD_DEFAULT_OPTIONS_FACTORY } from './ids-form-field-default-options';

import { IdsActionDirective } from '../../directives/ids-action.directive';
import { IdsPrefixDirective } from '../../directives/ids-prefix.directive';
import { IdsSuffixDirective } from '../../directives/ids-suffix.directive';
import { IDS_FORM_ELEMENT } from '../../tokens/form';
import { IdsValidators } from '../../validators';
import { IdsErrorMessageComponent } from '../message/ids-error-message/ids-error-message.component';
import { IdsHintMessageComponent } from '../message/ids-hint-message/ids-hint-message.component';

import { ChangeDetectionStrategy, Component, computed, contentChildren, HostBinding, inject, Injector, input, isDevMode, viewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { AllVariantsType, createClassList, createComponentError, SizeType } from '@i-cell/ids-angular/core';

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
export class IdsFormFieldComponent {
  private readonly _componentClass = 'ids-form-field';
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_FORM_FIELD_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private _child = viewChild(IDS_FORM_ELEMENT);
  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
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
  public variant = input<AllVariantsType | null>(this._defaultOptions.variant);
  private _control = computed(() => this._child()?.controlDir);
  private _hostClasses = computed(() => createClassList(this._componentClass, []),
  );

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  constructor() {
    if (isDevMode() && !this._child()) {
      throw new Error(createComponentError(this._componentClass, 'no form element was provided'));
    }
  }

  public get displayedMessages(): 'error' | 'hint' | undefined {
    if (this._errorMessages().length > 0 && this._control()?.errors) {
      return 'error';
    }
    if (this._hintMessages().length > 0) {
      return 'hint';
    }
    return undefined;
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
}
