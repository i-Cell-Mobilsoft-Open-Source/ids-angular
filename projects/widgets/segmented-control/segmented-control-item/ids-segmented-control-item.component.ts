import { IdsSegmentedControlItemBase } from './ids-segmented-control-item-base';

import { IdsSegmentedControlDirective } from '../ids-segmented-control.directive';
import { IdsSegmentedControlItemChange } from '../types/ids-segmented-control-item-change';

import { Component, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent
  extends IdsSegmentedControlItemBase<IdsSegmentedControlDirective, IdsSegmentedControlItemChange>
  implements OnInit {
  protected readonly _componentClass = 'ids-segmented-control-item';
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  protected _parent = signal<IdsSegmentedControlDirective | null>(null);

  public id = input<string>(this._uniqueId);

  public ngOnInit = (): void => {
    const parent = this.injector.get(IdsSegmentedControlDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(this._getNonExistingParentError());
    }
    this._parent.set(parent);

    if (parent.isItemPreSelectedByValue(this)) {
      this.selected.set(true);
    }
  };

  public onClick = (): void => {
    this.changes.emit(new IdsSegmentedControlItemChange(this, !this.selected(), this.value()));
  };
}
