import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';

@Component({
  selector: 'app-menu-item-icon-only-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    IdsIconComponent,
  ],
  templateUrl: './menu-item-icon-only-example.component.html',
})
export class MenuItemIconOnlyExampleComponent {}
