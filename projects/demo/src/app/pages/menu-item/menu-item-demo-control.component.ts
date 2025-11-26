import { MenuItemDemoService } from './menu-item-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-menu-item-demo-control',
  imports: [
    TryoutControlComponent,
    TranslateModule,
    FormsModule,
    ControlTableComponent,
  ],
  templateUrl: './menu-item-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './menu-item-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuItemDemoControlComponent {
  public menuItemDemoService = inject(MenuItemDemoService);
}
