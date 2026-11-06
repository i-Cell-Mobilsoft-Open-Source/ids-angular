import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-panel-variants-example',
  imports: [
    OverlayModule,
    IdsButtonComponent,
    IdsOverlayPanelComponent,
    TranslateModule,
  ],
  templateUrl: './overlay-panel-variants-example.component.html',
})
export class OverlayPanelVariantsExampleComponent {}
