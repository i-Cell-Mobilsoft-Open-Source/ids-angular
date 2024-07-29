import { IdsSegmentedControlBase } from './ids-segmented-control-base';
import { IdsSegmentedControlToggleItemComponent } from './segmented-control-item/ids-segmented-control-toggle-item.component';
import { IdsSegmentedControlToggleItemChange } from './types/ids-segmented-control-item-change';

import { contentChildren, Directive, EventEmitter, forwardRef, input, Output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextUniqueId = 0;

@Directive({
  selector: 'ids-segmented-control-toggle',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSegmentedControlToggleDirective),
      multi: true,
    },
  ],
  host: {
    '[attr.id]': 'id()',
    '[attr.role]': 'radiogroup',
  },
})
export class IdsSegmentedControlToggleDirective
  extends IdsSegmentedControlBase<IdsSegmentedControlToggleItemComponent, IdsSegmentedControlToggleItemChange> {
  protected readonly _componentClass = 'ids-segmented-control-toggle';
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  protected _items = contentChildren<IdsSegmentedControlToggleItemComponent>(IdsSegmentedControlToggleItemComponent);
  public id = input<string>(this._uniqueId);
  public multiSelect = signal<boolean>(false); // multiselect is always false in toggle. Signal was necessary because of base directive class

  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlToggleItemChange>();

  protected _subscribeItemChanges = (): void => {
    this._items().forEach((item) => {
      this._subscription?.add(item.changes.subscribe(
        (change) => {
          const { source } = change;
          this._clearSelection();
          source.selected.set(true);
          this._selectionModel?.select(source);
          this.itemChanges.emit(change);
          this._emitValueChangeEvent();
          this._onTouched();
        },
      ));
    });
  };
}
