import { SpinnerDemoService } from './spinner-demo.service';

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
  ],
  templateUrl: './spinner-demo.component.html',
  styleUrl: './spinner-demo.component.scss',
})
export class SpinnerDemoComponent {
  public spinnerDemoService = inject(SpinnerDemoService);
}
