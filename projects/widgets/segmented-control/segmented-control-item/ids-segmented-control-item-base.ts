/* eslint-disable @angular-eslint/component-class-suffix */
import { IdsSegmentedControlToggleDirective } from '../ids-segmented-control-toggle.directive';
import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';
import { IdsSegmentedControlItemChange, IdsSegmentedControlToggleItemChange } from '../types/ids-segmented-control-item-change';

import { computed, Directive, ElementRef, EventEmitter, HostBinding, inject, Injector, input, InputSignal, OnInit, Output, signal, ViewChild } from '@angular/core';
import { coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';
import { mdiCheck } from '@mdi/js';

type SegmentedControlParent = IdsSegmentedControlToggleDirective | IdsSegmentedControlDirective;
type SegmentedControlItemEvent = IdsSegmentedControlToggleItemChange | IdsSegmentedControlItemChange;

@Directive({})
export abstract class IdsSegmentedControlItemBase<P extends SegmentedControlParent, E extends SegmentedControlItemEvent>
implements OnInit {
  protected abstract readonly _componentClass: string;
  protected abstract readonly _uniqueId: string;
  public readonly injector = inject(Injector);

  protected _parent = signal<P | null>(null);

  public readonly iconChecked = mdiCheck;

  public selected = signal<boolean>(false);

  public abstract id: InputSignal<string>;
  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this._parent()?.isDisabled());
  protected _multiSelect = computed(() => this._parent()?.multiSelect());
  public buttonName = computed(() => (this._parent()?.multiSelect() ? this.name() : this._parent()?.name()));
  public ariaPressed = computed(() => (this._multiSelect() ? this.selected() : null));
  public ariaChecked = computed(() => (!this._multiSelect() ? this.selected() : null));
  public role = computed(() => (this._multiSelect() ? 'button' : 'radio'));
  public buttonClasses = computed(() => createClassList(this._componentClass, [this.selected() ? 'selected' : null]));

  @ViewChild('button') private _buttonElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<E>();

  @HostBinding('class') get hostClasses(): string {
    return this._componentClass;
  }

  public ngOnInit(): void {
    const parent = this._getParent();
    if (!parent) {
      throw new Error(this._getNonExistingParentError());
    }
    this._parent.set(parent);

    if (parent.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  protected abstract _getParent(): P | null;
  protected abstract _createItemChangeEvent(): E;

  public onClick(): void {
    if (this._multiSelect() || !this.selected()) {
      this.changes.emit(this._createItemChangeEvent());
    }
  }

  public focus(options?: FocusOptions): void {
    this._buttonElement.nativeElement.focus(options);
  }

  private _getNonExistingParentError(): string {
    return createComponentError(this._componentClass, 'component must be direct child of a segmented control');
  }
}
