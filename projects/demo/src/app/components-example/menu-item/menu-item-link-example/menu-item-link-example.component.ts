import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-link-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './menu-item-link-example.component.html',
})
export class MenuItemLinkExampleComponent {}
