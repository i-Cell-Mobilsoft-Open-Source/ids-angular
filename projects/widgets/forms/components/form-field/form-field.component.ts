import { IDS_FORM_FIELD_DEFAULT_CONFIG, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY } from './form-field-defaults';
import { IDS_FORM_FIELD, IDS_FORM_FIELD_CONTROL } from './tokens/form-field-tokens';
import { IdsFormFieldVariantType } from './types/form-field-variant.type';

import { IdsActionDirective } from '../../directives/action.directive';
import { IdsPrefixDirective } from '../../directives/prefix.directive';
import { IdsSuffixDirective } from '../../directives/suffix.directive';
import { IdsValidators } from '../../validators';
import { IdsFieldsetComponent } from '../fieldset/fieldset.component';
import { IdsErrorMessageComponent } from '../message/error-message/error-message.component';
import { IdsHintMessageComponent } from '../message/hint-message/hint-message.component';
import { IdsSuccessMessageComponent } from '../message/success-message/success-message.component';

import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChild, contentChildren, ElementRef, inject, input, isDevMode, OnDestroy, viewChild, ViewEncapsulation } from '@angular/core';
import { Validators } from '@angular/forms';
import { createClassList, createComponentError, IdsSizeType } from '@i-cell/ids-angular/core';
import { Subject, takeUntil } from 'rxjs';

const defaultOptions = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-form-field',
  standalone: true,
  imports: [],
  templateUrl: './form-field.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IDS_FORM_FIELD,
      useExisting: IdsFormFieldComponent,
    },
  ],
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsFormFieldComponent implements AfterContentInit, OnDestroy {
  private readonly _componentClass = 'ids-form-field';
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _parentFieldset = inject(IdsFieldsetComponent, { optional: true });
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_FORM_FIELD_DEFAULT_CONFIG, { optional: true }),
  };

  private readonly _destroyed = new Subject<void>();

  private _fieldWrapper = viewChild.required<ElementRef<HTMLElement>>('fieldWrapper');
  private _child = contentChild(IDS_FORM_FIELD_CONTROL);
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
  public inputId = computed(() => this._child()?.id());
  public size = input<IdsSizeType>(this._defaultOptions.size);
  public variant = input<IdsFormFieldVariantType>(this._defaultOptions.variant);
  public safeSize = computed(() => this._parentFieldset?.size() ?? this.size());
  public safeVariant = computed(() => this._parentFieldset?.variant() ?? this.variant());
  public control = computed(() => this._child()?.ngControl);
  public disabled = computed(() => Boolean(this._child()?.disabled()));
  private _hasErrorState = computed(() => Boolean(this._child()?.hasErrorState()));
  private _hasSuccessState = computed(() => Boolean(this._child()?.hasSuccessState()));
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.safeSize(),
    this.safeVariant(),
    this.disabled() ? 'disabled' : null,
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

  public ngAfterContentInit(): void {
    if (isDevMode() && !this._child()) {
      throw new Error(createComponentError(this._componentClass, 'no form element was provided'));
    }
    this._child()?.ngControl?.statusChanges?.pipe(takeUntil(this._destroyed)).subscribe(() => {
      this._changeDetectorRef.markForCheck();
    });
  }

  public get hasRequiredValidator(): boolean {
    const control = this.control()?.control;
    if (!control) {
      return Boolean(this._child()?.required());
    }
    return control.hasValidator(Validators.required)
      || control.hasValidator(Validators.requiredTrue)
      || control.hasValidator(IdsValidators.required)
      || control.hasValidator(IdsValidators.requiredTrue)
      || control.hasValidator(IdsValidators.requiredFalse);
  }

  public getConnectedOverlayOrigin(): ElementRef {
    return this._fieldWrapper();
  }

  public containerClick(event: MouseEvent): void {
    const containerClick = this._child()?.onContainerClick;
    if (containerClick) {
      containerClick(event);
    }
  }

  public ngOnDestroy(): void {
    this._destroyed.next();
  }
}
