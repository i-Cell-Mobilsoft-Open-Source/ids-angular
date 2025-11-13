import { AvatarDemoService } from './avatar-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avatar-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './avatar-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './avatar-demo.component.scss',
  ],
})
export class AvatarDemoControlComponent {
  public avatarDemoService = inject(AvatarDemoService);
}
