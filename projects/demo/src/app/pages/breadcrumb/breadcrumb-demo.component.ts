import { BreadcrumbDemoService } from './breadcrumb-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { BREADCRUMB_EXAMPLES } from '../../components-example/breadcrumb/breadcrumb-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import {
  IdsBreadcrumbComponent,
} from '@i-cell/ids-angular/breadcrumb';
import { IdsNotificationComponent } from '@i-cell/ids-angular/notification';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-breadcrumb-demo',
  imports: [
    TryoutComponent,
    TranslatePipe,
    IdsBreadcrumbComponent,
    IdsNotificationComponent,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './breadcrumb-demo.component.html',
})
export class BreadcrumbDemoComponent {
  protected _breadcrumbDemoService = inject(BreadcrumbDemoService);
  public readonly breadcrumbExamples = BREADCRUMB_EXAMPLES;
}
