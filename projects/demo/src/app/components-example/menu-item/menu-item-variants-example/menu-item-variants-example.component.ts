import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-variants-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    TranslateModule,
  ],
  templateUrl: './menu-item-variants-example.component.html',
})
export class MenuItemVariantsExampleComponent {}
