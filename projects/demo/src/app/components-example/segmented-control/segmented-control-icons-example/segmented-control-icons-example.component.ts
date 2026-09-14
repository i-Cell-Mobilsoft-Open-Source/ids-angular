import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlDirective, IdsSegmentedControlItemComponent } from '@i-cell/ids-angular/segmented-control';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-icons-example',
  imports: [
    FormsModule,
    IdsIconComponent,
    IdsSegmentedControlDirective,
    IdsSegmentedControlItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-icons-example.component.html',
})
export class SegmentedControlIconsExampleComponent {
  public selection = 'list';
}
