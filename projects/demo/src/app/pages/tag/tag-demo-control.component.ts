import { TagDemoService } from './tag-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tag-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './tag-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tag-demo.component.scss',
  ],
})
export class TagDemoControlComponent {
  public tagDemoService = inject(TagDemoService);
}
