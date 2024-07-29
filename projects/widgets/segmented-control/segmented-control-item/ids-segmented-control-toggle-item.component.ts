import { IdsSegmentedControlItemBase } from './ids-segmented-control-item-base';

import { IdsSegmentedControlToggleDirective } from '../ids-segmented-control-toggle.directive';
import { IdsSegmentedControlToggleItemChange } from '../types/ids-segmented-control-item-change';

import { Component, input, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-toggle-item',
  standalone: true,
  imports: [IdsIconComponent],
  styleUrl: './ids-segmented-control-toggle-item.component.scss',
  templateUrl: './ids-segmented-control-item.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlToggleItemComponent
  extends IdsSegmentedControlItemBase<IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemChange>
  implements OnInit {
  public readonly componentClass = 'ids-segmented-control-toggle-item';
  public readonly uniqueId = `${this.componentClass}-${++nextUniqueId}`;

  public parent = signal<IdsSegmentedControlToggleDirective | null>(null);

  public id = input<string>(this.uniqueId);

  public ngOnInit = (): void => {
    const parent = this.injector.get(IdsSegmentedControlToggleDirective, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error(this.getNonExistingParentError());
    }
    this.parent.set(parent);

    if (parent.isItemPreSelectedByValue(this)) {
      this.selected.set(true);
    }
  };

  public onClick = (): void => {
    if (!this.selected()) {
      this.changes.emit(new IdsSegmentedControlToggleItemChange(this, this.value()));
    }
  };
}
