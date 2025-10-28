import { ChipDemoService } from './chip-demo.service';

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
  ],
  templateUrl: './chip-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './chip-demo.component.scss',
  ],
})
export class ChipDemoComponent {
  public chipDemoService = inject(ChipDemoService);
}
