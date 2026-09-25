import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';

@Component({
  selector: 'app-menu-item-sizes-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
  ],
  templateUrl: './menu-item-sizes-example.component.html',
})
export class MenuItemSizesExampleComponent {}
