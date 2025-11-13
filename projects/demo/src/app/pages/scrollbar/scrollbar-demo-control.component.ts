import { ScrollbarDemoService } from './scrollbar-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-scrollbar-demo-control',
  imports: [
    TranslateModule,
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './scrollbar-demo-control.component.html',
  styleUrl: './scrollbar-demo.component.scss',
})
export class ScrollbarDemoControlComponent {
  public scrollbarDemoService = inject(ScrollbarDemoService);
}
