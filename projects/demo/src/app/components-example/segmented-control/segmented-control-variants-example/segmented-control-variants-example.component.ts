import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-variants-example',
  imports: [
    FormsModule,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-variants-example.component.html',
})
export class SegmentedControlVariantsExampleComponent {
  public primary = 'week';
  public surface = 'week';
  public light = 'week';
}
