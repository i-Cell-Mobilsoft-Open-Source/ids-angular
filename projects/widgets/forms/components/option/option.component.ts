import { IdsOptionGroupComponent } from './option-group.component';
import { IDS_OPTION_GROUP } from './tokens/option-group';
import { IDS_OPTION_PARENT_COMPONENT } from './tokens/option-parent';
import { IdsOptionSelectionChange } from './types/option-events.class';

import { IdsFormFieldVariant, IdsFormFieldVariantType } from '../form-field/types/form-field-variant.type';
import { PseudoCheckboxComponent } from '../pseudo-checkbox/pseudo-checkbox.component';
import { IDS_PSEUDO_CHECKBOX_PARENT, IdsPseudoCheckboxParent } from '../pseudo-checkbox/tokens/pseudo-checkbox-parent';
import { IdsPseudoCheckboxState } from '../pseudo-checkbox/types/pseudo-checkbox-state.type';

import { FocusOrigin } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-option',
  imports: [
    IdsIconComponent,
    PseudoCheckboxComponent,
  ],
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IDS_PSEUDO_CHECKBOX_PARENT,
      useExisting: IdsOptionComponent,
    },
  ],
  host: {
    'role': 'option',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '(click)': 'selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsOptionComponent<T = unknown>
  extends ComponentBase
  implements OnInit, IdsPseudoCheckboxParent<IdsFormFieldVariantType> {
  protected override get _hostName(): string {
    return 'option';
  }

  private readonly _parent = inject(IDS_OPTION_PARENT_COMPONENT);
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly group = inject(IDS_OPTION_GROUP, { optional: true });

  private _textElement = viewChild.required<ElementRef<HTMLElement>>('text');

  public selected = signal<boolean>(false);
  private _active = signal<boolean>(false);
  public size = computed(() => this._parent.parentSize());
  public variant = computed(() =>  this._parent.parentVariant());

  public value = input<T>();
  public explicitViewValue = input<string | null>(null, { alias: 'viewValue' });
  public disabledInput = input<boolean, unknown>(false, { alias: 'disabled', transform: coerceBooleanAttribute });

  public disabled = false; // Do not delete this class member, until ListKeyManagerOption requires: `disabled: boolean`

  protected _groupOrOptionIsDisabled = computed(() => this.group?.disabled() || this.disabledInput());

  protected readonly _multiSelect = Boolean(this._parent?.multiSelect());

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  public onSelectionChange = output<IdsOptionSelectionChange<T>>();

  public viewValue = computed(() => this._textElement().nativeElement.textContent || this.explicitViewValue() || '');
  protected readonly _hostClasses = computed(() => this._getHostClasses([
    this.selected() ? 'selected' : null,
    this._active() ? 'active' : null,
    this._groupOrOptionIsDisabled() ? 'disabled' : null,
    this._multiSelect ? 'multiselect' : null,
    this.size(),
    this.variant(),
  ]));

  protected _pseudoCheckboxState = computed(() => (this.selected() ? IdsPseudoCheckboxState.CHECKED : IdsPseudoCheckboxState.UNCHECKED));
  public embeddedPseudoCheckboxSize = computed(() => this.size());
  public embeddedPseudoCheckboxVariant = signal(IdsFormFieldVariant.SURFACE);

  constructor() {
    super();
    effect(() => {  // Do not delete this effect, until ListKeyManagerOption requires: `disabled: boolean`
      this.disabled = this.disabledInput();
    });
  }

  public ngOnInit(): void {
    const parent = this._parent;

    if (parent.isOptionPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  protected _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'ENTER' || event.key === ' ') && !hasModifierKey(event)) {
      this.selectViaInteraction();
      event.preventDefault();
    }
  }

  public selectViaInteraction(): void {
    if (!this._groupOrOptionIsDisabled()) {
      this._emitSelectionChangeEvent(!this.selected(), true);
    }
  }

  public getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  public select(emitEvent = true): void {
    if (!this.selected()) {
      if (emitEvent) {
        this._emitSelectionChangeEvent(true);
      }
    }
  }

  public deselect(emitEvent = true): void {
    if (this.selected()) {
      if (emitEvent) {
        this._emitSelectionChangeEvent(false);
      }
    }
  }

  public focus(_origin?: FocusOrigin, options?: FocusOptions): void {
    const element = this._element.nativeElement;

    if (typeof element.focus === 'function') {
      element.focus(options);
    }
  }

  public setActiveStyles(): void {
    if (!this._active()) {
      this._active.set(true);
    }
  }

  public setInactiveStyles(): void {
    if (this._active()) {
      this._active.set(false);
    }
  }

  public getLabel(): string {
    return this.viewValue();
  }

  private _emitSelectionChangeEvent(selected: boolean, isUserInput = false): void {
    if (this._multiSelect || !this.selected()) {
      this.onSelectionChange.emit(new IdsOptionSelectionChange<T>(this, selected, isUserInput));
    }
  }
}

export function _countGroupLabelsBeforeOption(
  optionIndex: number,
  options: Readonly<IdsOptionComponent[]>,
  optionGroups: Readonly<IdsOptionGroupComponent[]>,
): number {
  if (optionGroups.length) {
    let groupCounter = 0;

    for (let i = 0; i < optionIndex + 1; i++) {
      if (options[i].group && options[i].group === optionGroups[groupCounter]) {
        groupCounter++;
      }
    }

    return groupCounter;
  }

  return 0;
}

export function _getOptionScrollPosition(
  optionOffset: number,
  optionHeight: number,
  currentScrollPosition: number,
  panelHeight: number,
): number {
  if (optionOffset < currentScrollPosition) {
    return optionOffset;
  }

  if (optionOffset + optionHeight > currentScrollPosition + panelHeight) {
    return Math.max(0, optionOffset - panelHeight + optionHeight);
  }

  return currentScrollPosition;
}
