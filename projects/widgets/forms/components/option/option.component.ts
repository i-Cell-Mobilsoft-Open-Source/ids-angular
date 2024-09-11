import { IdsOptionSelectionChange } from './option-events';
import { IDS_OPTION_GROUP, IdsOptionGroupComponent } from './option-group.component';
import { IDS_OPTION_PARENT_COMPONENT } from './option-parent';

import { FocusOrigin } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, output, signal, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

@Component({
  selector: 'ids-option',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './option.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'option',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled().toString()',
    '(click)': '_selectViaInteraction()',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsOptionComponent<T = unknown> extends ComponentBase {
  protected override readonly _componentName = 'option';
  private readonly _parent = inject(IDS_OPTION_PARENT_COMPONENT, { optional: true });
  private readonly _element = inject<ElementRef<HTMLElement>>(ElementRef);
  public readonly group = inject(IDS_OPTION_GROUP, { optional: true });

  public selected = signal<boolean>(false);
  private _active = signal<boolean>(false);

  public value = input<T>();
  public viewValue = input<string>();
  public disabled = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  public isDisabled = computed(() => this.group?.disabled() || this.disabled());

  protected readonly _checkIcon = mdiCheck;
  protected readonly _multiSelect = Boolean(this._parent?.multiSelect);

  public onSelectionChange = output<IdsOptionSelectionChange<T>>();

  protected readonly _hostClasses = computed(() => this._getHostClasses([
    this.selected() ? 'selected' : null,
    this._active() ? 'selected' : null,
    this.isDisabled() ? 'disabled' : null,
    this._multiSelect ? 'multiselect' : null,
  ]));

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'ENTER' || event.key === ' ') && !hasModifierKey(event)) {
      this._selectViaInteraction();
      event.preventDefault();
    }
  }

  private _selectViaInteraction(): void {
    if (!this.disabled) {
      this.selected.set(this._multiSelect ? !this.selected : true);
      this._emitSelectionChangeEvent(true);
    }
  }

  public getHostElement(): HTMLElement {
    return this._element.nativeElement;
  }

  public select(emitEvent = true): void {
    if (!this.selected()) {
      this.selected.set(true);

      if (emitEvent) {
        this._emitSelectionChangeEvent();
      }
    }
  }

  public deselect(emitEvent = true): void {
    if (this.selected()) {
      this.selected.set(false);

      if (emitEvent) {
        this._emitSelectionChangeEvent();
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

  private _emitSelectionChangeEvent(isUserInput = false): void {
    this.onSelectionChange.emit(new IdsOptionSelectionChange<T>(this, isUserInput));
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
