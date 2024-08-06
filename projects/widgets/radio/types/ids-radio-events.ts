import { IdsRadioItemComponent } from '../ids-radio-item/ids-radio-item.component';

export class RadioChangeEvent {
  constructor(
    public source: IdsRadioItemComponent,
    public value: unknown,
  ) {}
}
