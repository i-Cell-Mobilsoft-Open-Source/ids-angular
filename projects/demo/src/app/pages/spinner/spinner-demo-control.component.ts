import { SpinnerDemoService } from './spinner-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-spinner-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './spinner-demo-control.component.html',
  styleUrl: './spinner-demo.component.scss',
})
export class SpinnerDemoControlComponent {
  public spinnerDemoService = inject(SpinnerDemoService);
}
