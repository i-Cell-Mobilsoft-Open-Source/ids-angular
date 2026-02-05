import { IconDemoService } from './icon-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon/icon.component';
import { TranslateModule } from '@ngx-translate/core';

import type { IconInputControls } from './icon-demo.service';
import type { DemoControlConfig } from '../../../types/demo-control.type';

@Component({
  selector: 'app-icon-demo',
  imports: [
    TryoutComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    ControlTableComponent,
    TryoutControlComponent,
    DemoAndCodeComponent,
    PropTableComponent,
  ],
  templateUrl: './icon-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './icon-demo.component.scss',
  ],
})
export class IconDemoComponent implements OnInit {

  protected _iconDemoService = inject(IconDemoService);

  public ngOnInit(): void {
    this._iconDemoService.loadIcons();
  }

  protected _inputControlConfigWithoutFontSet(): DemoControlConfig<IconInputControls> {
    const cfg = this._iconDemoService.inputControlConfig();
    const next: DemoControlConfig<IconInputControls> = { ...cfg };
    delete (next as Partial<DemoControlConfig<IconInputControls>>).fontSet;
    return next;
  }
}
