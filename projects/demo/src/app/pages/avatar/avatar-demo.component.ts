import { AvatarDemoService } from './avatar-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsAvatarComponent, IdsAvatarImageDirective } from '@i-cell/ids-angular/avatar';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-avatar-demo',
  imports: [
    TryoutComponent,
    IdsAvatarComponent,
    IdsIconComponent,
    IdsAvatarImageDirective,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './avatar-demo.component.scss',
  ],
})
export class AvatarDemoComponent {
  protected _avatarDemoService = inject(AvatarDemoService);
}
