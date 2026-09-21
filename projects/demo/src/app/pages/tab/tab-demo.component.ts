import { TabDemoService } from './tab-demo.service';

import { IdsTabGroupComponent } from '../../../../../widgets/tab/tab-group.component';
import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { TAB_EXAMPLES } from '../../components-example/tab/tab-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTabComponent } from '@i-cell/ids-angular/tab';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-tab-demo',
  imports: [
    TryoutComponent,
    IdsButtonComponent,
    IdsTabGroupComponent,
    IdsTabComponent,
    IdsTooltipDirective,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './tab-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tab-demo.component.scss',
  ],
})
export class TabsDemoComponent implements OnInit {
  protected _tabDemoService = inject(TabDemoService);
  public readonly tabExamples = TAB_EXAMPLES;

  public ngOnInit(): void {
    this._tabDemoService.loadIcons();
  }
}
