import { SpinnerDemoService } from './spinner-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-spinner-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './spinner-demo-control.component.html',
  styleUrl: './spinner-demo.component.scss',
})
export class SpinnerDemoControlComponent {
  public spinnerDemoService = inject(SpinnerDemoService);
}
