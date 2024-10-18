import { IdsRadioGroupDirective } from '../radio-group.directive';
import { IdsRadioChangeEvent } from '../types/radio-events.class';

import { Component, computed, ElementRef, EventEmitter, inject, Injector, input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'ids-radio-item',
  standalone: true,
  imports: [],
  templateUrl: './radio-item.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsRadioItemComponent implements OnInit {
  private readonly _componentClass = 'ids-radio-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  public readonly injector = inject(Injector);

  private _parent!: IdsRadioGroupDirective;

  public selected = signal<boolean>(false);

  public inputId = input<string>(this._uniqueId);
  public value = input.required<unknown>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labelledby' });
  public ariaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this._parent.isDisabled());
  public name = computed(() => this._parent.name());
  public required = computed(() => this._parent.required());
  public ariaChecked = computed(() => this.selected());
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._parent.variant() ?? null,
    this._parent.labelPosition() ?? null,
    this.isDisabled() ? 'disabled' : null,
  ]));

  @ViewChild('input') private _inputElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<IdsRadioChangeEvent>();

  constructor() {
    const parent = this.injector.get(IdsRadioGroupDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(createComponentError(this._componentClass, 'component must be direct child of a radio group'));
    }
    this._parent = parent;
  }

  public ngOnInit(): void {
    if (this._parent.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  public onChange(): void {
    this.changes.emit(new IdsRadioChangeEvent(this, this.value()));
  }

  public touchTargetClick(): void {
    if (!this.selected() && !this.isDisabled()) {
      this._inputElement.nativeElement.focus();
      this.onChange();
    }
  }

  public innerCircleClick(): void {
    if (!this.selected() && !this.isDisabled()) {
      this._inputElement.nativeElement.focus();
      this.onChange();
    }
  }

  public focus(options?: FocusOptions): void {
    this._inputElement.nativeElement.focus(options);
  }
}
