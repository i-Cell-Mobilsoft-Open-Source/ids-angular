import { ButtonDemoService } from './button-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-demo-control',
  standalone: true,
  imports: [
    TryoutControlComponent,
    TranslateModule,
    ControlTableSmallComponent,
  ],
  templateUrl: './button-demo-control.component.html',
  //styleUrls: ['./button-demo-content.component.scss'], // Létre kell hozni
})
export class ButtonDemoControlComponent {
  public buttonDemoService = inject(ButtonDemoService);
}
