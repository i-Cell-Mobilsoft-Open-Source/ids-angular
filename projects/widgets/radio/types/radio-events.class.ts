import { IdsRadioItemComponent } from '../radio-item/radio-item.component';

export class IdsRadioChangeEvent {
  constructor(
    public source: IdsRadioItemComponent,
    public value: unknown,
  ) {}
}
