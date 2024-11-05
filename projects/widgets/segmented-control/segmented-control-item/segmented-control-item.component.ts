import { IdsSegmentedControlDirective } from '../segmented-control.directive';
import { IdsSegmentedControlItemChange } from '../types/segmented-control-item-change.class';
import { SegmentedControlItem } from '../types/segmented-control-item.class';

import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, OnInit, output, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { addClassPrefix, coerceNumberAttribute, ComponentBase } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSegmentedControlItemComponent
  extends ComponentBase
  implements OnInit, SegmentedControlItem {
  protected override get _hostName(): string {
    return 'segmented-control-item';
  }

  protected readonly _group = inject(IdsSegmentedControlDirective, { optional: true, skipSelf: true });

  private _buttonElement = viewChild.required<ElementRef<HTMLButtonElement>>('button');

  public selected = signal<boolean>(false);

  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  protected _buttonId = computed(() => `${this.id()}-button`);
  protected _parentOrSelfDisabled = computed(() => this.disabled() || this._group?.disabled());
  protected _multiSelect = computed(() => this._group?.multiSelect());
  protected _ariaPressed = computed(() => (this._multiSelect() ? this.selected() : null));
  protected _ariaChecked = computed(() => (!this._multiSelect() ? this.selected() : null));
  protected _role = computed(() => (this._multiSelect() ? 'button' : 'radio'));
  protected _buttonName = computed(() => (this._multiSelect() ? this.name() : this._group?.name()));
  protected _buttonClasses = computed(() => addClassPrefix(this._hostClassName, this.selected() ? 'selected' : null));
  protected _hostClasses = computed(() => this._getHostClasses([]));

  public readonly changes = output<IdsSegmentedControlItemChange>();

  public ngOnInit(): void {
    if (!this._group) {
      throw new Error(this._createHostError('component must be direct child of a segmented control'));
    }

    if (this._group.isItemPreSelectedByValue(this.value())) {
      this.selected.set(true);
    }
  }

  public onClick(): void {
    if (this._multiSelect() || !this.selected()) {
      this.changes.emit(new IdsSegmentedControlItemChange(this, !this.selected(), this.value()));
    }
  }

  public focus(options?: FocusOptions): void {
    this._buttonElement().nativeElement.focus(options);
  }
}
