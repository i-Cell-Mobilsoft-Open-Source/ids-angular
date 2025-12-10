import { TabDemoService } from './tab-demo.service';

import { IdsTabGroupComponent } from '../../../../../widgets/tab/tab-group.component';
import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-demo',
  imports: [
    TryoutComponent,
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    PropTableComponent,
  ],
  templateUrl: './tab-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tab-demo.component.scss',
  ],
})
export class TabsDemoComponent implements OnInit {
  protected _tabDemoService = inject(TabDemoService);

  public ngOnInit(): void {
    this._tabDemoService.loadIcons();
  }
}
