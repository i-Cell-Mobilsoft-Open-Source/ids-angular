import { IdsRadioComponent } from '../radio.component';

export class IdsRadioChangeEvent {
  constructor(
    public source: IdsRadioComponent,
    public value: unknown,
  ) {}
}
