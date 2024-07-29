import { IdsSegmentedControlBase } from './ids-segmented-control-base';
import { IdsSegmentedControlItemComponent } from './segmented-control-item/ids-segmented-control-item.component';
import { IdsSegmentedControlItemChange } from './types/ids-segmented-control-item-change';

import { contentChildren, Directive, EventEmitter, forwardRef, input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

let nextUniqueId = 0;

@Directive({
  selector: 'ids-segmented-control',
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
  public readonly componentClass = 'ids-segmented-control';
  public readonly uniqueId = `${this.componentClass}-${++nextUniqueId}`;

  public items = contentChildren<IdsSegmentedControlItemComponent>(IdsSegmentedControlItemComponent);
  public id = input<string>(this.uniqueId);
  public multiSelect = input<boolean>(false);

  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlItemChange>();

  public subscribeItemChanges = (): void => {
    this.items().forEach((item) => {
      this.subscription?.add(item.changes.subscribe(
        (change) => {
          const { source, selected } = change;
          if (!this.multiSelect()) {
            this.clearSelection();
          }
          source.selected.set(selected);
          if (selected) {
            this.selectionModel?.select(source);
          } else {
            this.selectionModel?.deselect(source);
          }
          this.itemChanges.emit(change);
          this.emitValueChangeEvent();
          this.onTouched();
        },
      ));
    });
  };
}
