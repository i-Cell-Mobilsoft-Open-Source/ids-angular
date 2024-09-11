import { IdsSegmentedControlItemBase } from './ids-segmented-control-item-base';

import { IdsSegmentedControlToggleDirective } from '../ids-segmented-control-toggle.directive';
import { IdsSegmentedControlToggleItemChange } from '../types/ids-segmented-control-item-change';

import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-toggle-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlToggleItemComponent
  extends IdsSegmentedControlItemBase<IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemChange>
  implements OnInit {
  /** @ignore **/
  protected readonly _componentClass = 'ids-segmented-control-toggle-item';
  /** @ignore **/
  protected readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  public id = input<string>(this._uniqueId);

  /** @ignore **/
  protected _getParent(): IdsSegmentedControlToggleDirective | null {
    return this.injector.get(IdsSegmentedControlToggleDirective, null, { optional: true, skipSelf: true });
  }

  /** @ignore **/
  protected _createItemChangeEvent(): IdsSegmentedControlToggleItemChange {
    return new IdsSegmentedControlToggleItemChange(this, this.value());
  }
}
