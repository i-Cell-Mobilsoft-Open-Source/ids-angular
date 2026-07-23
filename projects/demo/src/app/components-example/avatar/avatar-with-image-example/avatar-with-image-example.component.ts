import { Component } from '@angular/core';
import { IdsAvatarComponent, IdsAvatarImageDirective } from '@i-cell/ids-angular/avatar';

@Component({
  selector: 'app-avatar-with-image-example',
  imports: [
    IdsAvatarComponent,
    IdsAvatarImageDirective,
  ],
  templateUrl: './avatar-with-image-example.component.html',
})
export class AvatarWithImageExampleComponent {}
