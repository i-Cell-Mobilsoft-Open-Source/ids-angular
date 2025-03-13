import { IDS_FORM_FIELD_DEFAULT_CONFIG, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsFormFieldDefaultConfig } from './form-field-defaults';
import { IDS_FORM_FIELD_CONTROL } from './tokens/form-field-control';
import { IdsFormFieldVariantType } from './types/form-field-variant.type';

import { IdsFormFieldActionDirective } from '../../directives/form-field-action.directive';
import { IdsPrefixDirective } from '../../directives/prefix.directive';
import { IdsSuffixDirective } from '../../directives/suffix.directive';
import { IdsValidators } from '../../validators';
import { IdsFieldsetComponent } from '../fieldset/fieldset.component';
import { IdsErrorMessageComponent } from '../message/error-message/error-message.component';
import { IdsHintMessageComponent } from '../message/hint-message/hint-message.component';
import { IdsSuccessMessageComponent } from '../message/success-message/success-message.component';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChild, contentChildren, ElementRef, inject, input, viewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-form-field',
  imports: [],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsFormFieldComponent extends ComponentBaseWithDefaults<IdsFormFieldDefaultConfig> {
  protected override get _hostName(): string {
    return 'form-field';
  }

  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _parentFieldset = inject(IdsFieldsetComponent, { optional: true });
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_FORM_FIELD_DEFAULT_CONFIG);

  private _fieldWrapper = viewChild.required<ElementRef<HTMLElement>>('fieldWrapper');
  private _child = contentChild.required(IDS_FORM_FIELD_CONTROL);
  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
  private _successMessages = contentChildren(IdsSuccessMessageComponent, { descendants: true });
  private _errorMessages = contentChildren(IdsErrorMessageComponent, { descendants: true });
  private _actions = contentChildren(IdsFormFieldActionDirective);
  private _prefixes = contentChildren(IdsPrefixDirective);
  private _suffixes = contentChildren(IdsSuffixDirective);

  public hasActions = computed(() => Boolean(this._actions().length));
  public hasLeadingIcon = computed(() => Boolean(this._prefixes().filter((prefix) => prefix.isLeadingIcon).length));
  public hasPrefix = computed(() => Boolean(this._prefixes().filter((prefix) => !prefix.isLeadingIcon).length));
  public hasSuffix = computed(() => Boolean(this._suffixes().filter((suffix) => !suffix.isTrailingIcon).length));
  public hasTrailingIcon = computed(() => Boolean(this._suffixes().filter((suffix) => suffix.isTrailingIcon).length));
  public inputId = computed(() => this._child().id());
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsFormFieldVariantType>(this._defaultConfig.variant);
  public parentOrSelfSize = computed(() => this._parentFieldset?.size() ?? this.size());
  public parentOrSelfVariant = computed(() => this._parentFieldset?.variant() ?? this.variant());
  public controlDir = computed(() => this._child().ngControl());
  public disabled = computed(() => Boolean(this._child().disabled()));
  private _hasErrorState = computed(() => Boolean(this._child().hasErrorState()));
  private _hasSuccessState = computed(() => Boolean(this._child().hasSuccessState()));
  protected _hostClasses = computed(() => this._getHostClasses([
    this.parentOrSelfSize(),
    this.parentOrSelfVariant(),
    this.disabled() ? 'disabled' : null,
    this._hasErrorState() ? 'invalid' : null,
    this._hasSuccessState() ? 'valid' : null,
  ]));

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

  public hasRequiredValidator = computed(() => {
    const control = this.controlDir()?.control;
    return this._child().required()
      || control?.hasValidator(Validators.required)
      || control?.hasValidator(Validators.requiredTrue)
      || control?.hasValidator(IdsValidators.required)
      || control?.hasValidator(IdsValidators.requiredTrue)
      || control?.hasValidator(IdsValidators.requiredFalse);
  });

  public getConnectedOverlayOrigin(): ElementRef {
    return this._fieldWrapper();
  }

  public containerClick(event: MouseEvent): void {
    const containerClick = this._child().onContainerClick;
    if (containerClick) {
      containerClick(event);
    }
  }
}
