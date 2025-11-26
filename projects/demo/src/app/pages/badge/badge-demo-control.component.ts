import { BadgeDemoService } from './badge-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-badge-demo-control',
  standalone: true,
  imports: [
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './badge-demo-control.component.html',
  styleUrl: './badge-demo.component.scss',
})
export class BadgeDemoControlComponent {
  public badgeDemoService = inject(BadgeDemoService);
}
