import { BreadcrumbDemoService } from './breadcrumb-demo.service';

import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import {
  IdsBreadcrumbComponent,
} from '@i-cell/ids-angular/breadcrumb';
import { IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    TranslatePipe,
    IdsBreadcrumbComponent,
    IdsNotificationComponent,
  ],
  templateUrl: './breadcrumb-demo.component.html',
  styleUrl: './breadcrumb-demo.component.scss',
})
export class BreadcrumbDemoComponent {
  public breadcrumbDemoService = inject(BreadcrumbDemoService);
}
