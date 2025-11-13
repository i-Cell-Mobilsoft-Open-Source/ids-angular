import { AvatarDemoService } from './avatar-demo.service';

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
  ],
  templateUrl: './avatar-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './avatar-demo.component.scss',
  ],
})
export class AvatarDemoComponent {
  public avatarDemoService = inject(AvatarDemoService);
}
