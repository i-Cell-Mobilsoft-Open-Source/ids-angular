import { IdsOptionComponent } from '../option.component';

export class IdsOptionSelectionChange<T = unknown> {
  constructor(
    public source: IdsOptionComponent<T>,
    public selected: boolean,
    public isUserInput = false,
  ) {}
}
