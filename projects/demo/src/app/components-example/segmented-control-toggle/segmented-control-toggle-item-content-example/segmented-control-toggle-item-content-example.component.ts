import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-item-content-example',
  imports: [
    FormsModule,
    IdsIconComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-item-content-example.component.html',
})
export class SegmentedControlToggleItemContentExampleComponent {
  public iconOnly = 'account';
  public labelWithoutActiveIcon = 'account';
  public withSuffix = 'account';
}
