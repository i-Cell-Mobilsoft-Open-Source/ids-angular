import { IdsRadioItemComponent } from '../radio-item/radio-item.component';

export class RadioChangeEvent {
  constructor(
    public source: IdsRadioItemComponent,
    public value: unknown,
  ) {}
}
