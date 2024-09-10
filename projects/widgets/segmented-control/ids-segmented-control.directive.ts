import { IdsSegmentedControlBase } from './ids-segmented-control-base';
import { IdsSegmentedControlItemComponent } from './segmented-control-item/ids-segmented-control-item.component';
import { IdsSegmentedControlItemChange } from './types/ids-segmented-control-item-change';

import { contentChildren, Directive, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextUniqueId = 0;

@Directive({
  selector: 'ids-segmented-control[ngModel],ids-segmented-control[formControl],ids-segmented-control[formControlName]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSegmentedControlDirective),
      multi: true,
    },
  ],
  host: {
    '[attr.id]': 'id()',
    '[attr.role]': 'multiSelect() ? "group" : "radiogroup"',
  },
})
export class IdsSegmentedControlDirective extends IdsSegmentedControlBase<IdsSegmentedControlItemComponent, IdsSegmentedControlItemChange> {
  /** @ignore */
  protected readonly _componentClass = 'ids-segmented-control';
  /** @ignore */
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  /** @ignore */
  protected _items = contentChildren<IdsSegmentedControlItemComponent>(IdsSegmentedControlItemComponent);
  public id = input<string>(this._uniqueId);
  public multiSelect = input<boolean>(false);

  /** @ignore **/
  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlItemChange>();

  /** @ignore **/
  protected _handleItemChanges(change: IdsSegmentedControlItemChange): void {
    const { source, selected } = change;
    if (!this.multiSelect()) {
      this._clearSelection();
    }
    source.selected.set(selected);
    if (selected) {
      this._selectionModel?.select(source);
    } else {
      this._selectionModel?.deselect(source);
    }
    this.itemChanges.emit(change);
    this._handleChange();
    this._onTouched();
  }
}
