import { ScrollbarDemoService } from './scrollbar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-scrollbar-demo-control',
  imports: [
    TranslateModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './scrollbar-demo-control.component.html',
  styleUrl: './scrollbar-demo.component.scss',
})
export class ScrollbarDemoControlComponent {
  public scrollbarDemoService = inject(ScrollbarDemoService);
}
