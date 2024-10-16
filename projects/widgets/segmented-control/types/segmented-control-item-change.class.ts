import { IdsSegmentedControlItemComponent } from '../segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlToggleItemComponent } from '../segmented-control-item/segmented-control-toggle-item.component';

export class IdsSegmentedControlItemChange {
  constructor(
    public source: IdsSegmentedControlItemComponent,
    public selected: boolean,
    public value: unknown,
  ) {}
}

export class IdsSegmentedControlToggleItemChange {
  constructor(
    public source: IdsSegmentedControlToggleItemComponent,
    public value: unknown,
  ) {}
}
