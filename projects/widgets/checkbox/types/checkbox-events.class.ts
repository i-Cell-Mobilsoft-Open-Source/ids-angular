import { IdsCheckboxComponent } from '../checkbox.component';

export class IdsCheckBoxChangeEvent {
  public source!: IdsCheckboxComponent;
  public checked!: boolean;
  public value?: unknown;
}
