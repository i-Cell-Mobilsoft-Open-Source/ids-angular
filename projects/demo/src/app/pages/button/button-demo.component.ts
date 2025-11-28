import { ButtonDemoService } from './button-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { IdsButtonComponent, IdsButtonGroupComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-button-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    IdsButtonComponent,
    IdsButtonGroupComponent,
    IdsIconComponent,
    TranslateModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './button-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './button-demo.component.scss',
  ],
})

export class ButtonDemoComponent {
  protected _buttonDemoService = inject(ButtonDemoService);
}
