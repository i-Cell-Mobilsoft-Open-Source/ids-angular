import { NotificationDemoService } from './notification-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-demo-control',
  imports: [
    TranslateModule,
    FormsModule,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './notification-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './notification-demo.component.scss',
  ],
})
export class NotificationDemoControlComponent {
  public notificationDemoService = inject(NotificationDemoService);
}
