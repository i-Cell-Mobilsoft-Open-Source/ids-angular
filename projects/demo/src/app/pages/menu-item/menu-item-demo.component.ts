import { MenuItemDemoService } from './menu-item-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { MENU_ITEM_EXAMPLES } from '../../components-example/menu-item/menu-item-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { CdkMenuBar } from '@angular/cdk/menu';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActiveIndicatorDirective, IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-demo',
  imports: [
    TryoutComponent,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    IdsIconComponent,
    CdkMenuBar,
    RouterLink,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './menu-item-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './menu-item-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuItemDemoComponent {
  protected _menuItemDemoService = inject(MenuItemDemoService);
  public readonly menuItemExamples = MENU_ITEM_EXAMPLES;
}
