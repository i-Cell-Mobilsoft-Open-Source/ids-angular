import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsNotificationActionButtonDirective, IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-action-buttons-example',
  imports: [
    IdsNotificationComponent,
    IdsButtonComponent,
    IdsNotificationActionButtonDirective,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './notification-action-buttons-example.component.html',
})
export class NotificationActionButtonsExampleComponent {}
