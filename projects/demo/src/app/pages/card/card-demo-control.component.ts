import { CardDemoService } from './card-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-card-demo-control',
  imports: [
    FormsModule,
    TranslateModule,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './card-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './card-demo.component.scss',
  ],
})
export class CardDemoControlComponent {
  public cardDemoService = inject(CardDemoService);
}
