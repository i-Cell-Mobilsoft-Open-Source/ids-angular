import { IconDemoService } from './icon-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './icon-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-demo.component.scss',
  ],
})
export class IconDemoControlComponent {
  public iconDemoService = inject(IconDemoService);
}
