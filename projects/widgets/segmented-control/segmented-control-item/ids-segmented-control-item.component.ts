import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';
import { IdsSegmentedControlItemChange } from '../types/ids-segmented-control-item-change';

import { Component, computed, ElementRef, EventEmitter, HostBinding, inject, Injector, input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  styleUrl: './ids-segmented-control-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent implements OnInit {
  private readonly _componentClass = 'ids-segmented-control-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);

  private _parent!: IdsSegmentedControlDirective;

  public readonly iconChecked = mdiCheck;

  public selected: boolean = false;

  public id = input<string>(this._uniqueId);
  public name = input<string>();
  public value = input.required<unknown>();
  public label = input<string>();
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledBy = input<string>('', { alias: 'aria-labeledby' });
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);

  public multiSelect = computed(() => this._parent.multiSelect());
  public buttonName = computed(() => (this._parent.multiSelect() ? this.name() : this._parent.name()));

  @ViewChild('button') private _buttonElement!: ElementRef<HTMLButtonElement>;

  @Output() public readonly changes = new EventEmitter<IdsSegmentedControlItemChange>();

  @HostBinding('class') get hostClasses(): string {
    return this._componentClass;
  }

  public ngOnInit(): void {
    const parent = this._injector.get(IdsSegmentedControlDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error('Segmented control item: segmented control item must be inside a segmented control.');
    }
    this._parent = parent;

    if (parent.isItemPreSelected(this)) {
      this.selected = true;
    }
  }

  public onClick(): void {
    this.changes.emit(new IdsSegmentedControlItemChange(this, !this.selected, this.value()));
  }

  public focus(options?: FocusOptions): void {
    this._buttonElement.nativeElement.focus(options);
  }
}
