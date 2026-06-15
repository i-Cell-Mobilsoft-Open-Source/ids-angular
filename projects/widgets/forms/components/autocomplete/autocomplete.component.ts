import {
  IDS_AUTOCOMPLETE_DEFAULT_CONFIG,
  IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY,
  IdsAutocompleteDefaultConfig,
} from './autocomplete-defaults';
import { IdsAutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { IdsOptionValue } from './types/option-value.type';

import { AbstractErrorStateMatcher } from '../../common/error/error-state';
import { AbstractSuccessStateMatcher } from '../../common/success/success-state';
import { formFieldControlClass, IdsFormFieldControl } from '../form-field/form-field-control';
import { IdsFormFieldComponent } from '../form-field/form-field.component';
import { IDS_FORM_FIELD_CONTROL } from '../form-field/tokens/form-field-control';
import { IdsOptionGroupComponent } from '../option/option-group.component';
import { IdsOptionComponent } from '../option/option.component';
import { IDS_OPTION_GROUP } from '../option/tokens/option-group';
import { IDS_OPTION_PARENT_COMPONENT } from '../option/tokens/option-parent';

import {
  Component,
  contentChildren,
  ElementRef,
  inject,
  viewChild,
  model,
  computed,
  input,
  effect,
  untracked,
  booleanAttribute,
  forwardRef,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceNumberAttribute } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { IdsSpinnerComponent, IdsSpinnerVariant, IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

const defaultConfig = IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-autocomplete',
  imports: [
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsOverlayPanelComponent,
    IdsSpinnerComponent,
    IdsTooltipDirective,
  ],
  template: `
    @if (panelOpen()) {
      <ids-overlay-panel
        #overlayPanel
        appearance="elevated"
        [origin]="_overlayOrigin"
        [open]="panelOpen()"
        [size]="parentSize()"
        [panelClasses]="_panelClasses()"
      >
        <div
          #panel
          class="ids-autocomplete-panel"
          role="listbox"
          [id]="id() + '-panel'"
          [attr.aria-multiselectable]="multiSelect()"
          [attr.aria-label]="ariaLabel() || null"
          [attr.aria-labelledby]="ariaLabelledby() || null"
        >
          <ng-content />
        </div>
      </ids-overlay-panel>
    }
    <span class="ids-autocomplete-suffix">
      @if (trigger().selected.length > 0 || trigger().hasInputValue) {
        <button
          type="button"
          idsIconButton
          [appearance]="appearance()"
          [variant]="parentVariant()"
          [disabled]="disabled()"
          [ariaLabel]="ariaLabelClear()"
          [idsTooltip]="ariaLabelClear()"
          [idsTooltipDisabled]="!ariaLabelClear()"
          [idsTooltipIgnoreClipped]="true"
          (click)="trigger().clear()"
        >
          <ids-icon alt="" aria-hidden="true" fontIcon="close" />
        </button>
      }
      @if (isLoading()) {
        <ids-spinner
          sizeCollection="small"
          [variant]="spinnerVariant()"
          [isTrack]="true"
          [aria-label]="ariaLabelLoading()"
        />
      } @else {
        <ids-icon
          alt=""
          aria-hidden="true"
          [fontIcon]="trigger().autocomplete().panelOpen() ? 'chevron-up' : 'chevron-down'"
        />
      }
    </span>
  `,
  exportAs: 'idsAutocomplete',
  providers: [
    { provide: IDS_FORM_FIELD_CONTROL, useExisting: IdsAutocompleteComponent },
    { provide: IDS_OPTION_PARENT_COMPONENT, useExisting: IdsAutocompleteComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsAutocompleteComponent),
      multi: true,
    },
  ],
})
export class IdsAutocompleteComponent
  extends IdsFormFieldControl<IdsAutocompleteDefaultConfig>
  implements ControlValueAccessor, OnInit, AfterViewInit {
  protected override get _hostName(): string {
    return 'autocomplete';
  }

  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });
  public ariaLabelClear = input<string>('');
  public ariaLabelLoading = input<string>('');
  public multiSelect = input<boolean, boolean>(false, { transform: booleanAttribute });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public sortCompareFn = input<(a: IdsOptionValue, b: IdsOptionValue) => number>((a: IdsOptionValue, b: IdsOptionValue) =>
    a.viewValue.localeCompare(b.viewValue),
  );

  public valueCompareFn = input<(o1: unknown, o2: unknown) => boolean>(
    (o1: unknown, o2: unknown) => JSON.stringify(o1) === JSON.stringify(o2),
  );

  public trigger = input.required<IdsAutocompleteTriggerDirective>();
  public panelClasses = input<string>('');

  public panelOpen = model(false);
  public options = contentChildren(IdsOptionComponent, { descendants: true });
  public optionGroups = contentChildren<IdsOptionGroupComponent>(IDS_OPTION_GROUP, { descendants: true });
  public overlayPanel = viewChild<IdsOverlayPanelComponent>('overlayPanel');
  public panel = viewChild('panel', { read: ElementRef<HTMLElement> });

  public appearance = input<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
  public parentSize = computed(() => this._parentFormField.parentOrSelfSize());
  public parentVariant = computed(() => this._parentFormField.parentOrSelfVariant());
  public spinnerVariant = input<IdsSpinnerVariantType>(IdsSpinnerVariant.SURFACE);

  public isLoading = input<boolean, boolean>(false, { transform: booleanAttribute });
  public onChange: (value: unknown) => void = () => {};
  public onTouched: () => unknown = () => {};

  protected _overlayOrigin!: ElementRef;
  private readonly _parentFormField = inject(IdsFormFieldComponent);

  // holds actual value internally
  private _value: unknown | unknown[];

  // declarations of IdsFormFieldControl variables
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_AUTOCOMPLETE_DEFAULT_CONFIG);
  public readonly errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public readonly successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));
  protected readonly _elementRef = inject(ElementRef);
  protected _hostClasses = computed(() =>
    this._getHostClasses([
      this.parentSize(),
      this.disabled() ? 'disabled' : null,
    ], [formFieldControlClass]),
  );

  protected _panelClasses = computed(() => [
    'ids-autocomplete-overlay-panel',
    this.panelClasses(),
  ].join(' '));

  constructor() {
    super();
    effect(() => {
      const overlayPanelOpen = this.overlayPanel()?.open() ?? false;

      untracked(() => {
        if (!overlayPanelOpen && this.panelOpen()) {
          this.panelOpen.set(false);
        }
      });
    });
  }

  public ngOnInit(): void {
    if (!this._parentFormField) {
      throw this.createHostError('Select must be in a form field');
    }
  }

  public ngAfterViewInit(): void {
    this._initErrorStateTracker();
    queueMicrotask(() => {
      const controlDir = this.ngControl();
      if (controlDir?.control) {
        controlDir.control.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.updateErrorAndSuccessState());
      }
    });
  }

  public updateErrorAndSuccessState(): void {
    this._errorStateTracker?.updateErrorState();
    this._successStateTracker?.updateSuccessState();
  }

  // #region ControlValueAccessor implementation
  public writeValue(value: unknown | unknown[]): void {
    if (value !== null) {
      this._patchValue(value);
    } else {
      this.trigger()?.clear();
    }
    this._value = value;
  }

  public registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this.onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
  }
  // #endregion

  public handleChange(value: unknown | unknown[]): void {
    this._value = value;
    this.onChange(value);
  }

  // #region IdsFormFieldControl implementation
  public onContainerClick = (event: Event): void => {
    if (!this.readonly() && !this.disabled()) {
      const target = event.target as HTMLElement;
      // 'clear' button should not trigger focus on the input
      if (target.parentElement?.tagName === 'BUTTON' || (target.tagName === 'IDS-ICON' && target.parentElement?.tagName === 'BUTTON')) {
        return;
      }
      this.trigger().focus();
    }
  };
  // #endregion

  // #region required as `IDS_OPTION_PARENT`, but not used here as it cannot handle option content changes.
  // Selection is handled by `_updateCurrentSelection` method of `AutocompleteTriggerDirective`
  public isOptionPreSelectedByValue(): boolean {
    return false;
  }
  // #endregion

  public setScrollTop(scrollTop: number): void {
    if (this.panel()) {
      this.panel()!.nativeElement.scrollTop = scrollTop;
    }
  }

  public getScrollTop(): number {
    return this.panel() ? this.panel()?.nativeElement.scrollTop : 0;
  }

  public setPanelOpen(): void {
    this._overlayOrigin = this._parentFormField?.getConnectedOverlayOrigin();
    this.overlayPanel()?.overlayDir()?.overlayRef?.updateSize({ width: this._overlayOrigin.nativeElement.getBoundingClientRect().width });
    this._observeOverlayOrigin();
    this.panelOpen.set(true);
  }

  public createHostError(message: string): Error {
    throw this._createHostError(message);
  }

  private _observeOverlayOrigin(): void {
    const observer = new ResizeObserver(() => {
      this.overlayPanel()?.overlayDir()?.overlayRef?.updatePosition();
      this.overlayPanel()?.overlayDir()?.overlayRef?.updateSize({ width: this._overlayOrigin.nativeElement.getBoundingClientRect().width });
    });

    observer.observe(this._overlayOrigin.nativeElement);
  }

  // "async" way to patch value to ensure options are loaded before setting selection
  private _patchValue(value: unknown | unknown[]): void {
    const patchEffect = effect(
      () => {
        const options = this.options();

        untracked(() => {
          if (options.length > 0) {
            this.trigger().setSelectionByValue(value);
            patchEffect.destroy();
          }
        });
      },
      { injector: this._injector, manualCleanup: true },
    );
  }
}
