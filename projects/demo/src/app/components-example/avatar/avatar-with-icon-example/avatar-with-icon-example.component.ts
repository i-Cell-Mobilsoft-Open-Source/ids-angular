import { Component } from '@angular/core';
import { IdsAvatarComponent } from '@i-cell/ids-angular/avatar';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

@Component({
  selector: 'app-avatar-with-icon-example',
  imports: [
    IdsAvatarComponent,
    IdsIconComponent,
  ],
  templateUrl: './avatar-with-icon-example.component.html',
})
export class AvatarWithIconExampleComponent {}
