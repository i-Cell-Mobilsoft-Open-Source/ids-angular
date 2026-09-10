import { SpinnerDemoService } from './spinner-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { SPINNER_EXAMPLES } from '../../components-example/spinner/spinner-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject } from '@angular/core';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-spinner-demo',
  imports: [
    IdsSpinnerComponent,
    TranslatePipe,
    TryoutComponent,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './spinner-demo.component.html',
})
export class SpinnerDemoComponent {
  protected _spinnerDemoService = inject(SpinnerDemoService);
  public readonly spinnerExamples = SPINNER_EXAMPLES;
}
