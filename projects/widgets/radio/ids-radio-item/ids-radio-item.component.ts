import { IdsRadioGroupDirective } from '../ids-radio-group.directive';
import { RadioChangeEvent } from '../types/ids-radio-events';

import { Component, computed, ElementRef, EventEmitter, HostBinding, inject, Injector, input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { addClassPrefix, coerceNumberAttribute, createClassList, createComponentError } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

@Component({
  selector: 'ids-radio-item',
  standalone: true,
  imports: [],
  templateUrl: './ids-radio-item.component.html',
  styleUrl: './ids-radio-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsRadioItemComponent implements OnInit {
  private readonly _componentClass = 'ids-radio-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  public readonly injector = inject(Injector);

  protected _parent = signal<IdsRadioGroupDirective | null>(null);

  public selected = signal<boolean>(false);

  public inputId = input<string>(this._uniqueId);
  public value = input.required<unknown>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public ariaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this._parent()?.isDisabled());
  public name = computed(() => this._parent()?.name());
  public required = computed(() => this._parent()?.required());
  public ariaChecked = computed(() => this.selected());
  public inputClasses = computed(() => addClassPrefix(this._componentClass, this.selected() ? 'selected' : null));
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._parent()?.variant() ?? null,
    this._parent()?.labelPosition() ?? null,
    this.isDisabled() ? 'disabled' : null,
  ]));

  @ViewChild('input') private _inputElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<RadioChangeEvent>();

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  public ngOnInit(): void {
    const parent = this.injector.get(IdsRadioGroupDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(this._getNonExistingParentError());
    }
    this._parent.set(parent);

    if (parent.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  public onChange(): void {
    this.changes.emit(new RadioChangeEvent(this, this.value()));
  }

  public focus(options?: FocusOptions): void {
    this._inputElement.nativeElement.focus(options);
  }

  private _getNonExistingParentError(): string {
    return createComponentError(this._componentClass, 'component must be direct child of a segmented control');
  }
}
