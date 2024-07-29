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
  public readonly componentClass = 'ids-segmented-control-toggle';
  public readonly uniqueId = `${this.componentClass}-${++nextUniqueId}`;

  public items = contentChildren<IdsSegmentedControlToggleItemComponent>(IdsSegmentedControlToggleItemComponent);
  public id = input<string>(this.uniqueId);
  public multiSelect = signal<boolean>(false); // multiselect is always false in toggle. Signal was necessary because of base directive class

  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlToggleItemChange>();

  public subscribeItemChanges = (): void => {
    this.items().forEach((item) => {
      this.subscription?.add(item.changes.subscribe(
        (change) => {
          const { source } = change;
          this.clearSelection();
          source.selected.set(true);
          this.selectionModel?.select(source);
          this.itemChanges.emit(change);
          this.emitValueChangeEvent();
          this.onTouched();
        },
      ));
    });
  };
}
