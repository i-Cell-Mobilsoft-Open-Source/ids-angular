import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-overlay-panel-menu-example',
  imports: [
    CdkMenu,
    OverlayModule,
    IdsButtonComponent,
    IdsIconComponent,
    IdsMenuItemComponent,
    IdsOverlayPanelComponent,
    TranslateModule,
  ],
  templateUrl: './overlay-panel-menu-example.component.html',
})
export class OverlayPanelMenuExampleComponent {
  protected _closePanel(panel: IdsOverlayPanelComponent): void {
    panel.open.set(false);
  }
}
