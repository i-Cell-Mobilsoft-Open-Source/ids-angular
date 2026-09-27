import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-basic-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    TranslateModule,
  ],
  templateUrl: './menu-item-basic-example.component.html',
})
export class MenuItemBasicExampleComponent {}
