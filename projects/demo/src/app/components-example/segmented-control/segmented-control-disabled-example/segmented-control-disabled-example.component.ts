import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-disabled-example',
  imports: [
    FormsModule,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-disabled-example.component.html',
})
export class SegmentedControlDisabledExampleComponent {
  public disabled = 'week';
  public disabledItem = 'week';
}
