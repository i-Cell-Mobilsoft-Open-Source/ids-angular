import { Component } from '@angular/core';
import { IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-variants-example',
  imports: [
    IdsNotificationComponent,
    TranslateModule,
  ],
  templateUrl: './notification-variants-example.component.html',
})
export class NotificationVariantsExampleComponent {}
