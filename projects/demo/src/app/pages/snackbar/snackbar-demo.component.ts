import { SnackbarDemoService } from './snackbar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { SNACKBAR_EXAMPLES } from '../../components-example/snackbar/snackbar-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-snackbar-demo',
  imports: [
    TryoutComponent,
    IdsButtonComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './snackbar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './snackbar-demo.component.scss',
  ],
})
export class SnackbarDemoComponent {
  protected _snackbarDemoService = inject(SnackbarDemoService);
  public readonly snackbarExamples = SNACKBAR_EXAMPLES;
}
