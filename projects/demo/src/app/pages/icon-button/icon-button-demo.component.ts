import { IconButtonDemoService } from './icon-button-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-icon-button-demo',
  imports: [
    TryoutComponent,
    IdsIconButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    PropTableComponent,
  ],
  templateUrl: './icon-button-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class IconButtonDemoComponent {
  protected _iconButtonDemoService = inject(IconButtonDemoService);
}
