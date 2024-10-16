import { IdsSegmentedControlItemBase } from './segmented-control-item-base';

import { IdsSegmentedControlToggleDirective } from '../segmented-control-toggle.directive';
import { IdsSegmentedControlToggleItemChange } from '../types/segmented-control-item-change.class';

import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-toggle-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlToggleItemComponent
  extends IdsSegmentedControlItemBase<IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemChange>
  implements OnInit {
  protected readonly _componentClass = 'ids-segmented-control-toggle-item';
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  public id = input<string>(this._uniqueId);

  protected _getParent(): IdsSegmentedControlToggleDirective | null {
    return this.injector.get(IdsSegmentedControlToggleDirective, null, { optional: true, skipSelf: true });
  }

  protected _createItemChangeEvent(): IdsSegmentedControlToggleItemChange {
    return new IdsSegmentedControlToggleItemChange(this, this.value());
  }
}
