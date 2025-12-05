import { PaginatorDemoService } from './paginator-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-paginator-demo',
  imports: [
    TryoutComponent,
    IdsPaginatorComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    PropTableComponent,
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class PaginatorDemoComponent {
  protected _paginatorDemoService = inject(PaginatorDemoService);
}
