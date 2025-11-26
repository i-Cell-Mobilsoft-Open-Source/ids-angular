import { PaginatorDemoService } from './paginator-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-paginator-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './paginator-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './paginator-demo.component.scss',
  ],
})
export class PaginatorDemoControlComponent {
  public paginatorDemoService = inject(PaginatorDemoService);
}
