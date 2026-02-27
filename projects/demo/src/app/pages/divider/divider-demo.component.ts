import { DividerDemoService } from './divider-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-divider-demo',
  imports: [
    TryoutComponent,
    IdsDividerComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './divider-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './divider-demo.component.scss',
  ],
})
export class DividerDemoComponent {
  protected _dividerDemoService = inject(DividerDemoService);
}
