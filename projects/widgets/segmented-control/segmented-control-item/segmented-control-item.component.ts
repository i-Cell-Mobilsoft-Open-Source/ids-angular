import { IdsSegmentedControlItemBase } from './segmented-control-item-base';

import { IdsSegmentedControlDirective } from '../segmented-control.directive';
import { IdsSegmentedControlItemChange } from '../types/segmented-control-item-change.class';

import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent
  extends IdsSegmentedControlItemBase<IdsSegmentedControlDirective, IdsSegmentedControlItemChange>
  implements OnInit {
  protected readonly _componentClass = 'ids-segmented-control-item';
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  public id = input<string>(this._uniqueId);

  protected _getParent(): IdsSegmentedControlDirective | null {
    return this.injector.get(IdsSegmentedControlDirective, null, { optional: true, skipSelf: true });
  }

  protected _createItemChangeEvent(): IdsSegmentedControlItemChange {
    return new IdsSegmentedControlItemChange(this, !this.selected(), this.value());
  }
}
