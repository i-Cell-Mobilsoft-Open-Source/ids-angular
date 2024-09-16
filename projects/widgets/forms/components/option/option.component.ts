import { IdsOptionSelectionChange } from './option-events';
import { IDS_OPTION_GROUP, IdsOptionGroupComponent } from './option-group.component';
import { IDS_OPTION_PARENT_COMPONENT } from './option-parent';

import { FormFieldVariantType } from '../form-field/types/ids-form-field-variant.type';
import { IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT, IdsPseudoCheckboxParentComponent } from '../pseudo-checkbox/pseudo-checkbox-parent';
import { PseudoCheckboxComponent } from '../pseudo-checkbox/pseudo-checkbox.component';

import { FocusOrigin } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { CheckboxState } from '@i-cell/ids-angular/checkbox';
import { coerceBooleanAttribute, ComponentBase, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

@Component({
  selector: 'ids-option',
  standalone: true,
  imports: [
    IdsIconComponent,
    PseudoCheckboxComponent,
  ],
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IDS_PSEUDO_CHECKBOX_PARENT_COMPONENT,
      useExisting: IdsOptionComponent,
    },
  ],
  host: {
    'role': 'option',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled().toString()',
    '(click)': '_selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsOptionComponent<T = unknown>
  extends ComponentBase
  implements OnInit, IdsPseudoCheckboxParentComponent<FormFieldVariantType> {
  protected override get _componentName(): string {
    return 'option';
  }

  private readonly _parent = inject(IDS_OPTION_PARENT_COMPONENT);
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly group = inject(IDS_OPTION_GROUP, { optional: true });

  private _textElement = viewChild.required<ElementRef<HTMLElement>>('text');

  public selected = signal<boolean>(false);
  private _active = signal<boolean>(false);
  public size = signal<SizeType>(this._parent.parentSize());
  public variant = signal<FormFieldVariantType>(this._parent.parentVariant());

  public value = input<T>();
  public explicitViewValue = input<string | null>(null, { alias: 'viewValue' });
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  protected _groupOrOptionIsDisabled = computed(() => this.group?.disabled() || this.disabled());

  protected readonly _checkIcon = mdiCheck;
  protected readonly _multiSelect = Boolean(this._parent?.multiSelect());

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

  protected _pseudoCheckboxState = computed(() => (this.selected() ? CheckboxState.CHECKED : CheckboxState.UNCHECKED));

  public ngOnInit(): void {
    const parent = this._parent;

    if (parent.isOptionPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'ENTER' || event.key === ' ') && !hasModifierKey(event)) {
      this._selectViaInteraction();
      event.preventDefault();
    }
  }

  private _selectViaInteraction(): void {
    if (!this._groupOrOptionIsDisabled()) {
      this._emitSelectionChangeEvent(!this.selected());
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

  private _emitSelectionChangeEvent(selected: boolean): void {
    if (this._multiSelect || !this.selected()) {
      this.onSelectionChange.emit(new IdsOptionSelectionChange<T>(this, selected));
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
