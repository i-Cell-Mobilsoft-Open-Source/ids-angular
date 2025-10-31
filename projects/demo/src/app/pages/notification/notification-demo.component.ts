import { NotificationDemoService } from './notification-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsNotificationComponent, IdsNotificationActionButtonDirective } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-demo',
  imports: [
    TryoutComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    IdsNotificationComponent,
    IdsButtonComponent,
    IdsNotificationActionButtonDirective,
  ],
  templateUrl: './notification-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './notification-demo.component.scss',
  ],
})
export class NotificationDemoComponent {

  public notificationDemoService = inject(NotificationDemoService);
}
