import { IdsCheckboxComponent } from '../checkbox.component';

export class CheckBoxChangeEvent {
  public source!: IdsCheckboxComponent;
  public checked!: boolean;
  public value?: string;
}
