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
  /** @ignore */
  protected abstract readonly _componentClass: string;
  /** @ignore */
  protected abstract readonly _uniqueId: string;
  /** @ignore */
  public readonly injector = inject(Injector);

  /** @ignore */
  protected _parent = signal<P | null>(null);

  /** @ignore */
  public readonly iconChecked = mdiCheck;

  /** @ignore */
  public selected = signal<boolean>(false);

  public abstract id: InputSignal<string>;
  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  /** @ignore */
  public isDisabled = computed(() => this.disabled() || this._parent()?.disabled());
  /** @ignore */
  protected _multiSelect = computed(() => this._parent()?.multiSelect());
  /** @ignore */
  public buttonName = computed(() => (this._parent()?.multiSelect() ? this.name() : this._parent()?.name()));
  /** @ignore */
  public ariaPressed = computed(() => (this._multiSelect() ? this.selected() : null));
  /** @ignore */
  public ariaChecked = computed(() => (!this._multiSelect() ? this.selected() : null));
  /** @ignore */
  public role = computed(() => (this._multiSelect() ? 'button' : 'radio'));
  /** @ignore */
  public buttonClasses = computed(() => createClassList(this._componentClass, [this.selected() ? 'selected' : null]));

  /** @ignore */
  @ViewChild('button') private _buttonElement!: ElementRef<HTMLButtonElement>;

  /** @ignore */
  @Output() public readonly changes = new EventEmitter<E>();

  /** @ignore */
  @HostBinding('class') get hostClasses(): string {
    return this._componentClass;
  }

  /** @ignore */
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

  /** @ignore */
  protected abstract _getParent(): P | null;
  /** @ignore */
  protected abstract _createItemChangeEvent(): E;

  /** @ignore */
  public onClick(): void {
    if (this._multiSelect() || !this.selected()) {
      this.changes.emit(this._createItemChangeEvent());
    }
  }

  /** @ignore */
  public focus(options?: FocusOptions): void {
    this._buttonElement.nativeElement.focus(options);
  }

  /** @ignore */
  private _getNonExistingParentError(): string {
    return createComponentError(this._componentClass, 'component must be direct child of a segmented control');
  }
}
