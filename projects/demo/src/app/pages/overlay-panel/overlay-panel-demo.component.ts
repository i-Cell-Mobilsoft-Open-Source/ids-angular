import { OverlayPanelDemoService } from './overlay-panel-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsMenuItemComponent, IdsActiveIndicatorDirective,
} from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-panel-demo',
  imports: [
    TryoutComponent,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    ControlTableComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    ControlTableComponent,
    TryoutControlComponent,
    IdsButtonComponent,
    OverlayModule,
    IdsChipComponent,
    IdsPrefixDirective,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    CdkMenu,

  ],
  templateUrl: './overlay-panel-demo.component.html',
  styleUrls: ['../demo-page.scss'],
})
export class OverlayPanelDemoComponent {
  protected _overlayPanelDemoService = inject(OverlayPanelDemoService);

  // eslint-disable-next-line no-magic-numbers
  public items = Array(3);

  protected _contentBtnTest(nr: string):void {
    alert(`Button in overlay panel clicked! ${nr}`);
  }
}
