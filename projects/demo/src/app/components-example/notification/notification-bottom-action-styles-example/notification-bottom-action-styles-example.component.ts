import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsNotificationActionButtonDirective, IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-bottom-action-styles-example',
  imports: [
    IdsNotificationComponent,
    IdsButtonComponent,
    IdsNotificationActionButtonDirective,
    TranslateModule,
  ],
  templateUrl: './notification-bottom-action-styles-example.component.html',
})
export class NotificationBottomActionStylesExampleComponent {}
