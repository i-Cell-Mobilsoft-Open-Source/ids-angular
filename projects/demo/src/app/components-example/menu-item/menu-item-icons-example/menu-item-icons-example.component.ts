import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-icons-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './menu-item-icons-example.component.html',
})
export class MenuItemIconsExampleComponent {}
