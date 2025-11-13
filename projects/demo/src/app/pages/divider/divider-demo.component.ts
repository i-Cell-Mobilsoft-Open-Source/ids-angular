import { DividerDemoService } from './divider-demo.service';

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
  ],
  templateUrl: './divider-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './divider-demo.component.scss',
  ],
})
export class DividerDemoComponent {
  public dividerDemoService = inject(DividerDemoService);
}
