import { DemoControl, DemoControlConfig, DemoControlItem } from '../../../../types/demo-control.type';

import { Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsCardBodyDirective, IdsCardComponent, IdsCardHeaderComponent, IdsCardTitleDirective } from '@i-cell/ids-angular/card';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsSentenceCasePipe } from '@i-cell/ids-angular/core';
import { IdsFormFieldComponent, IdsInputDirective, IdsOptionComponent, IdsOptionGroupComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';

const DEFAULT_CONTROL_TABLE_PADDING = 8;

@Component({
  selector: 'app-control-table-small',
  imports: [
    IdsSentenceCasePipe,
    FormsModule,
    IdsCheckboxComponent,
    IdsSelectComponent,
    // IdsDatepickerTriggerComponent,
    IdsFormFieldComponent,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    IdsCardComponent,
    IdsCardTitleDirective,
    IdsCardBodyDirective,
    IdsCardHeaderComponent,
    IdsInputDirective,
  ],
  templateUrl: './control-table-small.component.html',
  styleUrl: './control-table-small.component.scss',
})
export class ControlTableSmallComponent<T extends Record<string, T[keyof T]>> {
  public cellPadding = input<number>(DEFAULT_CONTROL_TABLE_PADDING);
  public configType = input<'input' | 'helper'>('input');
  public controlName = input<string | undefined>();
  public controlConfig = input<DemoControlConfig<T>>();
  public model = model.required<T>();
  public resetted = output<void>();

  protected _demoControl = DemoControl;

  protected _caption = computed(() => [
    this.controlName(),
    this.configType(),
  ].filter(Boolean).join(' '));

  protected _flatControls = computed(() => {
    const controls = this.controlConfig();
    if (!controls) {
      return [];
    }
    return Object.entries<DemoControlItem<T[keyof T]>>(controls).map(([
      key,
      ctrl,
    ]) => {
      const listToDisplay = ctrl.control === 'select' ? ctrl.list : undefined;
      return ({
        name: key,
        ...ctrl,
        list: listToDisplay,
      });
    });
  });

  protected _updateModelValue(controlName: keyof T, newValue: T[keyof T]): void {
    // A .update() metódus meghívásával frissítjük a signalt,
    // ami automatikusan kiváltja a modelChange eseményt a szülő felé.
    this.model.update((currentModel) => ({
      ...currentModel,
      [controlName]: newValue,
    }));
  }

  protected _convertModelValueStringToNumberArray(controlName: keyof T): void {
    const value = this.model()[controlName];
    if (typeof value === 'string') {
      this.model.update((obj) => ({
        ...obj,
        [controlName]: this._stringToArray(obj[controlName] as string).map((item) => +item) as T[keyof T],
      }));
    }
  }

  private _stringToArray(value: string): string[] {
    const arr = value.split(',').map((item) => item.trim()).filter(Boolean);
    if (arr.length === 0) {
      return [];
    }
    return arr;
  }

  protected _reset(): void {
    this.resetted.emit();
  }
}
