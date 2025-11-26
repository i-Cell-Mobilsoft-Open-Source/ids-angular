import { IconButtonDemoService } from './icon-button-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableComponent,
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
