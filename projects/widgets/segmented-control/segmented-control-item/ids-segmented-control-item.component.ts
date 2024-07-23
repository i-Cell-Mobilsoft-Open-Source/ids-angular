import { IdsSegmentedControlComponent } from '../ids-segmented-control.component';

import { Component, EventEmitter, inject, Injector, input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck } from '@mdi/js';

let nextUniqueId = 0;

@Component({
  selector: 'ids-segmented-control-item',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './ids-segmented-control-item.component.html',
  styleUrl: './ids-segmented-control-item.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsSegmentedControlItemComponent implements OnInit {
  private readonly _componentClass = 'ids-segmented-control-item';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);

  public readonly iconChecked = mdiCheck;

  public checked = input<boolean>(false);
  public id = input<string>(this._uniqueId);
  public label = input<string>();

  @Output() public readonly changed = new EventEmitter<boolean>();

  public ngOnInit(): void {
    const parent = this._injector.get(IdsSegmentedControlComponent, null, { optional: true, skipSelf: true });
    if (!parent) {
      throw new Error('Segmented control item: segmented control item must be inside a segmented control.');
    }
  }

  public onClick(): void {
    this.changed.emit(!this.checked());
  }
}
