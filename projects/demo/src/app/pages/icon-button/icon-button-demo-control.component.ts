import { IconButtonDemoService } from './icon-button-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './icon-button-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-button-demo.component.scss',
  ],
})
export class IconButtonDemoControlComponent {
  public iconButtonDemoService = inject(IconButtonDemoService);
}
