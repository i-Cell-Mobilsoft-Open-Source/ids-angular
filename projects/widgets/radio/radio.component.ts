import { IdsRadioGroupDirective } from './radio-group.directive';
import { IdsRadioChangeEvent } from './types/radio-events.class';

import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, ComponentBase } from '@i-cell/ids-angular/core';

@Component({
  selector: 'ids-radio',
  imports: [],
  templateUrl: './radio.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsRadioComponent extends ComponentBase implements OnInit {
  protected override get _hostName(): string {
    return 'radio';
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

  protected _isDisabled = computed(() => this.disabled() || this._group?.isDisabled());
  protected _name = computed(() => this._group?.name());
  protected _required = computed(() => this._group?.required());
  protected _ariaChecked = computed(() => this.selected());
  protected _inputId = computed(() => (this.inputId() === this._uniqueId ? `${this._uniqueId}-native` : this.inputId()));
  protected _hostClasses = computed(() => this._getHostClasses([
    this._group?.variant() ?? null,
    this._group?.labelPosition() ?? null,
    this._isDisabled() ? 'disabled' : null,
  ]));

  private _inputElement = viewChild.required<ElementRef<HTMLButtonElement>>('input');

  public readonly changes = output<IdsRadioChangeEvent>();

  public ngOnInit(): void {
    if (!this._group) {
      throw this._createHostError('component must be direct child of a radio group');
    }
    if (this._group.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  public onChange(): void {
    this.changes.emit(new IdsRadioChangeEvent(this, this.value()));
  }

  protected _touchTargetClick(): void {
    if (!this.selected() && !this._isDisabled()) {
      this._inputElement().nativeElement.focus();
      this.onChange();
    }
  }

  protected _innerCircleClick(): void {
    if (!this.selected() && !this._isDisabled()) {
      this._inputElement().nativeElement.focus();
      this.onChange();
    }
  }

  public focus(options?: FocusOptions): void {
    this._inputElement().nativeElement.focus(options);
  }
}
