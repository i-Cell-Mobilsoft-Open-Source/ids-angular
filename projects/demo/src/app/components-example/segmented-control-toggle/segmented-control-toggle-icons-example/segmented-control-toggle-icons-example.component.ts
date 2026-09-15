import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-segmented-control-toggle-icons-example',
  imports: [
    FormsModule,
    IdsIconComponent,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    TranslateModule,
  ],
  templateUrl: './segmented-control-toggle-icons-example.component.html',
})
export class SegmentedControlToggleIconsExampleComponent {
  public selection = 'list';
  public selectionWithoutActiveIcon = 'list';
}
