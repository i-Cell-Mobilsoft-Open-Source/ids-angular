import { ChipDemoService } from './chip-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsChipComponent, IdsChipGroupComponent } from '@i-cell/ids-angular/chip';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-chip-demo',
  imports: [
    TryoutComponent,
    IdsChipGroupComponent,
    IdsChipComponent,
    IdsAvatarComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsPrefixDirective,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './chip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './chip-demo.component.scss',
  ],
})
export class ChipDemoComponent {
  protected _chipDemoService = inject(ChipDemoService);
}
