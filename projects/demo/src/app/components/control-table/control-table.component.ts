import { DemoControlConfig, DemoControlItem } from '../../../types/demo-control.type';

import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, computed, input, model, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

const DEFAULT_CONTROL_TABLE_PADDING = 8;

@Component({
  selector: 'app-control-table',
  standalone: true,
  imports: [
    KeyValuePipe,
    TitleCasePipe,
    FormsModule,
  ],
  templateUrl: './control-table.component.html',
  styleUrl: './control-table.component.scss',
})
export class ControlTableComponent<T extends Record<string, unknown>> {
  public cellPadding = input<number>(DEFAULT_CONTROL_TABLE_PADDING);
  public configType = input<'input' | 'helper'>('input');
  public controlName = input<string | undefined>();
  public controlConfig = input<DemoControlConfig<T>>();
  public model = model.required<T>();
  
  public resetted = output<void>();

  protected _flatControls = computed(() => {
    const controls = this.controlConfig();
    if (!controls) {
      return [];
    }
    return Object.entries<DemoControlItem<T>>(controls).map(([
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

  protected _reset(): void {
    this.resetted.emit();
  }
}
