import { ButtonDemoService } from './button-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-demo-control',
  standalone: true,
  imports: [
    TryoutControlComponent,
    TranslateModule,
    ControlTableComponent,
  ],
  templateUrl: './button-demo-control.component.html',
  styleUrl: './button-demo.component.scss',
})
export class ButtonDemoControlComponent {
  public buttonDemoService = inject(ButtonDemoService);
}
