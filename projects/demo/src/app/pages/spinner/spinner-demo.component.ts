import { SpinnerDemoService } from './spinner-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner/spinner.component';
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
  ],
  templateUrl: './spinner-demo.component.html',
  styleUrl: './spinner-demo.component.scss',
})
export class SpinnerDemoComponent {
  public spinnerDemoService = inject(SpinnerDemoService);
}
