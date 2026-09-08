import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-icon-button-size-example',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './icon-button-size-example.component.html',
})
export class IconButtonSizeExampleComponent {}
