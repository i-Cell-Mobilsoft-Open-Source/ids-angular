import { NotificationDemoService } from './notification-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnInit } from '@angular/core';
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
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './notification-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './notification-demo.component.scss',
  ],
})
export class NotificationDemoComponent implements OnInit {

  public notificationDemoService = inject(NotificationDemoService);

  public ngOnInit(): void {
    this.notificationDemoService.loadIcons();
  }

}
