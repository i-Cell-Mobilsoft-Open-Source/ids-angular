import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-multi-select-example',
  imports: [
    FormsModule,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-multi-select-example.component.html',
})
export class SegmentedControlMultiSelectExampleComponent {
  public selection = [
    'email',
    'push',
  ];
}
