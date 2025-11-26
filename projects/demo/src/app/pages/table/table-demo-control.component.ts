import { TableDemoTableIntl } from './table-demo.component';
import { TableDemoService } from './table-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IdsTableIntl } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-demo-control',
  imports: [
    TranslateModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './table-demo-control.component.html',
  styleUrl: './table-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: IdsTableIntl,
      useClass: TableDemoTableIntl,
    },
  ],
})
export class TableDemoControlComponent {
  public tableDemoService = inject(TableDemoService);
}
