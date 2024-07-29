import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';
import { IdsSegmentedControlItemChange } from '../types/ids-segmented-control-item-change';

import { Component, computed, ElementRef, EventEmitter, HostBinding, inject, Injector, input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent implements OnInit {
  private readonly _componentClass = 'ids-segmented-control-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);

  private _parent!: IdsSegmentedControlDirective;

  public readonly iconChecked = mdiCheck;

  public selected = signal<boolean>(false);

  public id = input<string>(this._uniqueId);
  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this._parent.isDisabled());
  public multiSelect = computed(() => this._parent.multiSelect());
  public buttonName = computed(() => (this._parent.multiSelect() ? this.name() : this._parent.name()));
  public ariaPressed = computed(() => (this.multiSelect() ? this.selected() : null));
  public ariaChecked = computed(() => (!this.multiSelect() ? this.selected() : null));
  public role = computed(() => (this.multiSelect() ? 'button' : 'radio'));
  public buttonClasses = computed(() => createClassList(this._componentClass, [this.selected() ? 'selected' : null]));

  @ViewChild('button') private _buttonElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<IdsSegmentedControlItemChange>();

  @HostBinding('class') get hostClasses(): string {
    return this._componentClass;
  }

  public ngOnInit(): void {
    const parent = this._injector.get(IdsSegmentedControlDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(createComponentError(this._componentClass, 'component must be direct child of a segmented control'));
    }
    this._parent = parent;

    if (parent.isItemPreSelectedByValue(this)) {
      this.selected.set(true);
    }
  }

  public onClick(): void {
    this.changes.emit(new IdsSegmentedControlItemChange(this, !this.selected, this.value()));
  }

  public focus(options?: FocusOptions): void {
    this._buttonElement.nativeElement.focus(options);
  }
}
