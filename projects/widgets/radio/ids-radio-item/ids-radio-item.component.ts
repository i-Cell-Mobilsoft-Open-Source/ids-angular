import { IdsRadioGroupDirective } from '../ids-radio-group.directive';
import { RadioChangeEvent } from '../types/ids-radio-events';

import { Component, computed, ElementRef, EventEmitter, HostBinding, inject, Injector, input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'ids-radio-item',
  standalone: true,
  imports: [],
  templateUrl: './ids-radio-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsRadioItemComponent implements OnInit {
  /** @ignore */
  private readonly _componentClass = 'ids-radio-item';
  /** @ignore */
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  /** @ignore */
  public readonly injector = inject(Injector);

  /** @ignore */
  private _parent!: IdsRadioGroupDirective;

  public selected = signal<boolean>(false);

  public inputId = input<string>(this._uniqueId);
  public value = input.required<unknown>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labelledby' });
  public ariaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  /** @ignore */
  public isDisabled = computed(() => this.disabled() || this._parent.isDisabled());
  /** @ignore */
  public name = computed(() => this._parent.name());
  /** @ignore */
  public required = computed(() => this._parent.required());
  /** @ignore */
  public ariaChecked = computed(() => this.selected());
  /** @ignore */
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._parent.variant() ?? null,
    this._parent.labelPosition() ?? null,
    this.isDisabled() ? 'disabled' : null,
  ]));

  /** @ignore */
  @ViewChild('input') private _inputElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<RadioChangeEvent>();

  /** @ignore */
  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  constructor() {
    const parent = this.injector.get(IdsRadioGroupDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(createComponentError(this._componentClass, 'component must be direct child of a radio group'));
    }
    this._parent = parent;
  }

  /** @ignore */
  public ngOnInit(): void {
    if (this._parent.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  /** @ignore */
  public onChange(): void {
    this.changes.emit(new RadioChangeEvent(this, this.value()));
  }

  /** @ignore */
  public touchTargetClick(): void {
    if (!this.selected()) {
      this._inputElement.nativeElement.focus();
      this.onChange();
    }
  }

  /** @ignore */
  public innerCrircleClick(): void {
    if (!this.selected()) {
      this._inputElement.nativeElement.focus();
      this.onChange();
    }
  }

  /** @ignore */
  public focus(options?: FocusOptions): void {
    this._inputElement.nativeElement.focus(options);
  }
}
