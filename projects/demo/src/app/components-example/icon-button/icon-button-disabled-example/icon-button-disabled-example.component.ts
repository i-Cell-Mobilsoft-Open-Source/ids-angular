import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'app-icon-button-disabled-example',
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './icon-button-disabled-example.component.html',
})
export class IconButtonDisabledExampleComponent {}
