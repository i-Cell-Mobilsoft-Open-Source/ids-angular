import { ScrollbarDemoService } from './scrollbar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-scrollbar-demo',
  imports: [
    TryoutComponent,
    TranslateModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './scrollbar-demo.component.html',
  styleUrl: './scrollbar-demo.component.scss',
})
export class ScrollbarDemoComponent {
  protected _scrollbarDemoService = inject(ScrollbarDemoService);
}
