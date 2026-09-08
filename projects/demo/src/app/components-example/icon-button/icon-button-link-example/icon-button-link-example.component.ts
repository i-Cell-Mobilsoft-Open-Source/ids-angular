import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-icon-button-link-example',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './icon-button-link-example.component.html',
})
export class IconButtonLinkExampleComponent {}
