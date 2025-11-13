import { PaginatorDemoService } from './paginator-demo.service';

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
  ],
  templateUrl: './paginator-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './paginator-demo.component.scss',
  ],
})
export class PaginatorDemoComponent {
  public paginatorDemoService = inject(PaginatorDemoService);
}
