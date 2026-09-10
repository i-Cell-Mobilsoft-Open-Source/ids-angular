import { Component } from '@angular/core';
import { IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-notification-complex-example',
  imports: [
    IdsNotificationComponent,
    TranslateModule,
  ],
  templateUrl: './notification-complex-example.component.html',
})
export class NotificationComplexExampleComponent {}
