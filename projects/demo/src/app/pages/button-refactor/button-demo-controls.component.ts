import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { ButtonGroupInputControls, ButtonHelperControls, ButtonInputControls } from '../button/button-demo.component'; // Importáljuk a típusokat

import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-demo-controls',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ControlTableSmallComponent,

  ],
  templateUrl: './button-demo-controls.component.html',
  styleUrl: './button-demo-controls.component.scss', // Létre kell hozni
})
export class ButtonDemoControlsComponent {
  // Beállítási konfigurációk az eredeti komponensből
  @Input({ required: true }) public inputControlConfig!: DemoControlConfig<ButtonInputControls>;
  @Input({ required: true }) public helperControlConfig!: DemoControlConfig<ButtonHelperControls>;
  @Input({ required: true }) public groupInputControlConfig!: DemoControlConfig<ButtonGroupInputControls>;

  // Kétirányú adatkapcsolat ([(model)] = @Input() model + @Output() modelChange)
  @Input({ required: true }) public model!: ButtonInputControls;
  @Output() public modelChange = new EventEmitter<ButtonInputControls>();

  @Input({ required: true }) public helperModel!: ButtonHelperControls;
  @Output() public helperModelChange = new EventEmitter<ButtonHelperControls>();

  @Input({ required: true }) public groupModel!: ButtonGroupInputControls;
  @Output() public groupModelChange = new EventEmitter<ButtonGroupInputControls>();

  // Reset esemény
  @Output() public resetted = new EventEmitter<void>();

  // Segítő funkció a model változás kezelésére (a kétirányú kötéshez)
  public onModelChange(newModel: ButtonInputControls): void {
    this.modelChange.emit(newModel);
  }

  public onHelperModelChange(newModel: ButtonHelperControls): void {
    this.helperModelChange.emit(newModel);
  }

  public onGroupModelChange(newModel: ButtonGroupInputControls): void {
    this.groupModelChange.emit(newModel);
  }
}
