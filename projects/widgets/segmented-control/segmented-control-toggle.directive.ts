import { IdsSegmentedControlBase } from './segmented-control-base';
import { IdsSegmentedControlToggleItemComponent } from './segmented-control-item/segmented-control-toggle-item.component';
import { IdsSegmentedControlToggleItemChange } from './types/segmented-control-item-change';

import { contentChildren, Directive, EventEmitter, forwardRef, input, Output, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextUniqueId = 0;

@Directive({
  selector: 'ids-segmented-control-toggle[ngModel],ids-segmented-control-toggle[formControl],ids-segmented-control-toggle[formControlName]',
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
  /** @ignore **/
  protected readonly _componentClass = 'ids-segmented-control-toggle';
  /** @ignore **/
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  /** @ignore **/
  protected _items = contentChildren<IdsSegmentedControlToggleItemComponent>(IdsSegmentedControlToggleItemComponent);
  public id = input<string>(this._uniqueId);
  /** @ignore **/
  public multiSelect = signal<boolean>(false); // multiselect is always false in toggle. Signal was necessary because of base directive class

  /** @ignore **/
  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlToggleItemChange>();

  /** @ignore **/
  protected _handleItemChanges(change: IdsSegmentedControlToggleItemChange): void {
    const { source } = change;
    this._clearSelection();
    source.selected.set(true);
    this._selectionModel?.select(source);
    this.itemChanges.emit(change);
    this._handleChange();
    this._onTouched();
  }
}
