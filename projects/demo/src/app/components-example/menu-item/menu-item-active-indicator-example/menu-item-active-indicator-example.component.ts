import { CdkMenuBar } from '@angular/cdk/menu';
import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActiveIndicatorDirective, IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-active-indicator-example',
  imports: [
    CdkMenuBar,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './menu-item-active-indicator-example.component.html',
})
export class MenuItemActiveIndicatorExampleComponent {}
