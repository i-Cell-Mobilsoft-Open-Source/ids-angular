import { BadgeDemoService } from './badge-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { BADGE_EXAMPLES } from '../../components-example/badge/badge-examples';
import { IdsExampleViewerComponent } from '../../shared/ids-example-viewer/ids-example-viewer.component';

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { IdsBadgeDirective } from '@i-cell/ids-angular/badge';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-badge-demo',
  imports: [
    IdsBadgeDirective,
    IdsIconComponent,
    TryoutComponent,
    TranslatePipe,
    TryoutControlComponent,
    ControlTableComponent,
    DemoAndCodeComponent,
    IdsExampleViewerComponent,
  ],
  templateUrl: './badge-demo.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './badge-demo.component.scss',
})
export class BadgeDemoComponent {
  protected _badgeDemoService = inject(BadgeDemoService);
  public readonly badgeExamples = BADGE_EXAMPLES;
}
