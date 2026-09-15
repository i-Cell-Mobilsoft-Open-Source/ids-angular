import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-sizes-example',
  imports: [
    FormsModule,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-sizes-example.component.html',
})
export class SegmentedControlToggleSizesExampleComponent {
  public dense = 'week';
  public compact = 'week';
  public comfortable = 'week';
  public spacious = 'week';
}
