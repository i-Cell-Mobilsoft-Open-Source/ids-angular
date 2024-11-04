import { IdsRadioGroupDirective } from '../radio-group.directive';
import { IdsRadioChangeEvent } from '../types/radio-events.class';

import { ChangeDetectionStrategy, Component, computed, ElementRef, EventEmitter, inject, input, OnInit, Output, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, ComponentBase, createComponentError } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-radio-item',
  standalone: true,
  imports: [],
  templateUrl: './radio-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsRadioItemComponent extends ComponentBase implements OnInit {
  protected override get _componentName(): string {
    return 'radio-item';
  }

  private _group = inject(IdsRadioGroupDirective, { optional: true, skipSelf: true });

  public selected = signal<boolean>(false);

  public inputId = input<string>(this._uniqueId);
  public value = input.required<unknown>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labelledby' });
  public ariaDescribedBy = input<string>('', { alias: 'aria-describedby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public isDisabled = computed(() => this.disabled() || this._group?.isDisabled());
  public name = computed(() => this._group?.name());
  public required = computed(() => this._group?.required());
  public ariaChecked = computed(() => this.selected());
  protected _hostClasses = computed(() => this._getHostClasses([
    this._group?.variant() ?? null,
    this._group?.labelPosition() ?? null,
    this.isDisabled() ? 'disabled' : null,
  ]));

  @ViewChild('input') private _inputElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<IdsRadioChangeEvent>();

  public ngOnInit(): void {
    if (!this._group) {
      throw new Error(createComponentError(this._componentClass, 'component must be direct child of a radio group'));
    }
    if (this._group.isItemPreSelectedByValue(this.value())) {
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
