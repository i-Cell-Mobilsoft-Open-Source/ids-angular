import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-icon-button-variants-example',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './icon-button-variants-example.component.html',
})
export class IconButtonVariantsExampleComponent {}
