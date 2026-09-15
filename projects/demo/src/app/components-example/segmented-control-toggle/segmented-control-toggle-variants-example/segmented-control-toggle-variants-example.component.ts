import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-variants-example',
  imports: [
    FormsModule,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-variants-example.component.html',
})
export class SegmentedControlToggleVariantsExampleComponent {
  public surface = 'week';
  public light = 'week';
}
