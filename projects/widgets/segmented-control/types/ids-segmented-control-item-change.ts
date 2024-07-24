import { IdsSegmentedControlItemComponent } from '../segmented-control-item/ids-segmented-control-item.component';

export class IdsSegmentedControlItemChange {
  constructor(
    public source: IdsSegmentedControlItemComponent,
    public selected: boolean,
    public value: unknown,
  ) {}
}
