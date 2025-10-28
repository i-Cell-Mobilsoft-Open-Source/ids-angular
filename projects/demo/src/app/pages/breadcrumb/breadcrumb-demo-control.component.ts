import { BreadcrumbDemoService } from './breadcrumb-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-breadcrumb-demo-control',
  standalone: true,
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './breadcrumb-demo-control.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
})
export class BreadcrumbDemoControlComponent {
  public breadcrumbDemoService = inject(BreadcrumbDemoService);
}
